const { readdirSync, rmSync, mkdirSync, writeFileSync, lstatSync, existsSync } = require('fs');
const path = require('path');
const _url = require('url');
const https = require('https');
const http = require('https');
const { exec } = require('child_process');

const getAppPath = ()=> new Promise(async (resolve, reject)=>{
    try{
        const { dirname } = path;
        for(let path of module.paths){
            if(existsSync(path)){
                return resolve(dirname(path));
            }
        }
        resolve(null);
    }catch(e){
        resolve(null);
    }
});

const mergeJson = (...targets)=>{
    let result = {};
    for(let target of targets){
        if(typeof target !== "object"){continue;}
        for(const [key, value] of Object.entries(target)){
            result[key] = Array.isArray(value) ? value : typeof value === "object" ? mergeJson(result[key], value) : value;
        }
    }
    return result;
}

const npmls = ()=> new Promise(async (resolve, reject)=>{
    try{
        const pathApp = await getAppPath();
        if(typeof pathApp !== "string" || !existsSync(path)){
            resolve({});
        }
        exec('npm ls --json', {cwd: pathApp}, (error, stdout, stderr) => {
            resolve(JSON.parse(stdout || "{dependencies: {}}")["dependencies"] || {});
        });
    }catch({message}){
        resolve({});
    }
});

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
            code += `import ${name} from "./${imported}"\n`;
            importeds.push(name);
        });

        code += `\nexport {${importeds.join(", ")}}`;

        writeFile(path.join(dir, "index.js"), code);
    });
}

const install = async (...packages)=>{
    const conf = {headers: {"User-Agent": 'ismael1361', "authorization": "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"}};

    const download = async (url)=> new Promise(async (resolve, reject)=>{
        let errorDowloadFile = 0, dependencies = {};

        try{
            const response = await request(url, conf);

            const elements = JSON.parse(response).map(({name, path, url, download_url, type})=>({name, path: path.replace(/^solutions\//gi, ""), url: (type === "file" ? download_url : url), type}));

            for(let f=0; f<elements.length; f++){
                const element = elements[f];
                if(element.name === "dependencies" && element.type === "file"){
                    const content = await request(element.url, conf).catch(()=>{});
                    dependencies = mergeJson(dependencies, content && typeof content === "string" ? JSON.parse(content) : {});
                    continue;
                }

                const {name, path: _path, url: _url, type} = element;

                if(type === "file"){
                    try{
                        const response = await request(_url, conf);
                        writeFile(path.join(root, _path), response);
                    }catch(e){
                        errorDowloadFile += 1;
                    }
                }else if(type === "dir"){
                    let result = await download(_url);
                    dependencies = mergeJson(dependencies, result.dependencies);
                    errorDowloadFile += result.erros;
                }
            }
        }catch(e){
            errorDowloadFile = errorDowloadFile <= 0 ? 1 : errorDowloadFile;
        }

        resolve({dependencies, erros: errorDowloadFile});
    });

    const printLog = Array.isArray(packages[0]) && typeof packages[1] === "boolean" ? packages[1] : true;

    packages = Array.isArray(packages[0]) ? packages[0] : packages;

    let dependenciesRoot = {
        dependencies: {},
        devDependencies: {}
    };

    for(let i=0; i<packages.length; i++){
        const package = packages[i];
        const url = `https://api.github.com/repos/ismael1361/react_native/contents/solutions/${package}`;

        const response = await request(url, conf).catch(()=>{
            console.error(`The declared ${package} package does not exist or an error occurred while acquiring the data!\nurl: ${url}\n`);
        });

        if(!response){ continue; }

        try{
            let {dependencies, erros: errorDowloadFile} = await download(url);

            if(Array.isArray(dependencies["internal"]) && dependencies["internal"].length > 0){
                const d = await install(dependencies["internal"], false).catch(()=>{});
                dependenciesRoot = mergeJson(dependenciesRoot, d);
            }

            if(errorDowloadFile > 0){
                rmSync(path.join(root, package), { recursive: true, force: true });
                printLog && console.error(`Error when trying to download the ${package} package`);
            }else{
                printLog && console.log(`The ${package} package was successfully installed`);

                if(dependencies["npm"]){
                    dependenciesRoot = mergeJson(dependenciesRoot, dependencies["npm"]);
                }
            }
        }catch(e){}
    }

    let dependenciesList = Object.entries(dependenciesRoot["dependencies"] || {});
    let devDependenciesList = Object.entries(dependenciesRoot["devDependencies"] || {});

    const dependencies_installed = await npmls();

    dependenciesList = dependenciesList.filter(([dep])=> !dependencies_installed[dep]);
    devDependenciesList = devDependenciesList.filter(([dep])=> !dependencies_installed[dep]);

    if(dependenciesList.length > 0 || devDependenciesList.length > 0){
        printLog && console.log("\n\n* Installed packages require installation of dependencies, run the following commands to install:\n");

        if(dependenciesList.length > 0){
            printLog && console.log(`    npm i ${dependenciesList.map(d=> d.join("@")).join(" ")}`);
        }

        if(devDependenciesList.length > 0){
            printLog && console.log(`    npm i ${devDependenciesList.map(d=> d.join("@")).join(" ")} --save-dev`);
        }

        printLog && console.log("\n");
    }

    updateExporteds();

    return dependenciesRoot;
}

(async ()=>{
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