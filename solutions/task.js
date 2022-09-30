const { readdirSync, rmSync, mkdirSync, writeFileSync, lstatSync } = require('fs');
const path = require('path');
const _url = require('url');
const https = require('https');
const http = require('https');

const request = (url, config)=> new Promise((resolve, reject)=>{
    try{
        const q = _url.parse(url, true);
        const conf = Object.assign({hostname: q.hostname, path: q.path}, config);
        ((/^https/gi).test(q.protocol) ? https : http).get(conf, res => {
            let data = [];
            res.on('data', chunk => { data.push(chunk); });
            res.on('end', ()=>{
                if(res.statusCode !== 200){
                    reject(Buffer.concat(data).toString());
                }
                resolve(Buffer.concat(data).toString());
            });
        }).on('error', ({message}) => {
            reject(message);
        });
    }catch({message}){
        reject(message);
    }
});

const isExists = (path)=>{
    try{
        return lstatSync(path).isDirectory();
    }catch{ return false; }
};

const mkdirp = (dirname)=>{
    dirname = path.normalize(dirname).split(path.sep);
    dirname.forEach((sdir,index)=>{
        const pathInQuestion = dirname.slice(0,index+1).join(path.sep);
        if((!isExists(pathInQuestion)) && pathInQuestion) mkdirSync(pathInQuestion);
    });
};

const writeFile = (filePath, data)=>{
    try{
        mkdirp(path.dirname(filePath));
        writeFileSync(filePath, data, 'utf8');
    }catch(err){}
};

const getDirectories = source => readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
const getFiles = source => readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(dirent => dirent.name);

const root = __dirname;

const argumentos = process.argv.map(argv => argv.toString());

const getNextArgv = ()=>{return argumentos.shift();}

const updateExporteds = ()=>{
    const projects = getDirectories(__dirname);

    projects.forEach((directory)=>{
        const dir = path.join(root, directory);
        const importList = [...getDirectories(dir), ...getFiles(dir)];

        if(importList.length <= 0){return;}

        let code = "", importeds = [];

        importList.forEach((imported)=>{
            const name = imported.replace(/\.([\S\W\w]+)$/gi, "");
            if(name === "index"){return;}
            code += `import ${name} from "${path.join(directory, imported).replace(/\\+/gi, "/")}"\n`;
            importeds.push(name);
        });

        code += `\nexport {${importeds.join(", ")}}`;

        writeFile(path.join(dir, "index.js"), code);
    });
}

const install = async (...packages)=>{
    const conf = {headers: {"User-Agent": 'ismael1361'}};

    const download = async ({name, path: _path, url, type})=> new Promise(async (resolve, reject)=>{
        try{
            const response = await request(url, conf);
            writeFile(path.join(root, _path), response);
            resolve();
        }catch(e){
            reject();
        }
    });

    const printLog = Array.isArray(packages[0]) && typeof packages[1] === "boolean" ? packages[1] : true;

    packages = Array.isArray(packages[0]) ? packages[0] : packages;

    let dependenciesRoot = {
        dependencies: {},
        devDependencies: {}
    };

    const assignDependencies = ({dependencies, devDependencies})=>{
        dependenciesRoot["dependencies"] = Object.assign(dependenciesRoot["dependencies"], dependencies);
        dependenciesRoot["devDependencies"] = Object.assign(dependenciesRoot["devDependencies"], devDependencies);
    }

    for(let i=0; i<packages.length; i++){
        const package = packages[i];
        const url = `https://api.github.com/repos/ismael1361/react_native/contents/solutions/${package}`;

        const response = await request(url, conf).catch(()=>{
            console.error(`The declared ${package} package does not exist or an error occurred while acquiring the data!`);
        });

        try{
            const files = JSON.parse(response).map(({name, path, download_url, type})=>({name, path: path.replace(/^solutions\//gi, ""), url: download_url, type})).filter(file => file.type === "file");

            let errorDowloadFile = 0, dependencies = {};

            for(let f=0; f<files.length; f++){
                const file = files[f];
                if(file.name === "dependencies"){
                    const content = await request(file.url, conf).catch(()=>{});
                    dependencies = content && typeof content === "string" ? JSON.parse(content) : {};
                    continue;
                }

                await download(file).catch(()=>{
                    //console.error(`Error trying to download ${file.path}`);
                    errorDowloadFile += 1;
                });
            }

            if(Array.isArray(dependencies["internal"]) && dependencies["internal"].length > 0){
                const d = await install(dependencies["internal"], false).catch(()=>{});
                assignDependencies(d);
            }

            if(errorDowloadFile > 0){
                rmSync(path.join(root, package), { recursive: true, force: true });
                printLog && console.error(`Error when trying to download the ${package} package`);
            }else{
                printLog && console.log(`The ${package} package was successfully installed`);

                if(dependencies["npm"]){
                    assignDependencies(dependencies["npm"]);
                }
            }
        }catch(e){}
    }

    let dependenciesList = Object.entries(dependenciesRoot["dependencies"] || {});
    let devDependenciesList = Object.entries(dependenciesRoot["devDependencies"] || {});

    if(dependenciesList.length > 0 || devDependenciesList.length > 0){
        printLog && console.log("\n\n* Installed packages require installation of dependencies, run the following commands to install:");

        if(dependenciesList.length > 0){
            printLog && console.log(`       npm i ${dependenciesList.map(d=> d.join("@")).join(" ")}`);
        }

        if(devDependenciesList.length > 0){
            printLog && console.log(`       npm i ${devDependenciesList.map(d=> d.join("@")).join(" ")} --save-dev`);
        }

        printLog && console.log("\n");
    }

    updateExporteds();

    return dependenciesRoot;
}

(async()=>{
    try{
        while(argumentos.length > 0){
            arg = getNextArgv();

            switch(arg){
                case "-i":
                case "install":
                    let packages = [];
                    while((/^@/gi).test(argumentos[0])){
                        packages.push(getNextArgv());
                    }
                    packages = packages.filter(str => str.split("/").length == 2);
                    if(packages.length <= 0){
                        throw "There is no declared valid package to install!";
                    }
                    await install.apply(null, packages);
                    break;
                case "-ue":
                case "update-exports":
                    updateExporteds();
                    break;
            }
        }
    }catch(e){
        console.error(e);
    }
})();