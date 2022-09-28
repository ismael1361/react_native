# Projetos alternativos em React Native

## React Native

React Native é uma biblioteca Javascript criada pelo Facebook. É usada para desenvolver aplicativos para os sistemas Android e iOS de forma nativa.

Esse projeto tem como objetivo, oferecer alternativas e soluções para o âmbito do desenvolvimento mobile.

Cada projeto será separado por pastar de acordo com o que represente para fácil identificação. Além disso, conterá uma documentação markdown própria, demonstrando como realizar a instalação (de acordo com as dependências) e seu uso, demonstrando linhas de comando e exemplos.

Espero de coração que possa encontrar a solução para o seu problema nesse repositório 🤩😌

## Criando novo projeto React Native

Para a criação do projeto, é preciso tomar ciência de outros assuntos antes, como instalação e utilização de um emulador Android ou iOS. Você pode obter mais informações clicando [aqui](https://reactnative.dev/docs/environment-setup).

#### Expo Go

Execute o seguinte comando para criar um novo projeto React Native chamado "NewProject" (mude esse nome de acordo com o seu projeto):

```properties
npx create-expo-app NewProject

cd NewProject
npm start #você também pode usar: npx expo start
```

#### React Native CLI

> Se você instalou anteriormente um pacote global react-native-cli, remova-o, pois pode causar problemas inesperados: 
> ```npm uninstall -g react-native-cli @react-native-community/cli```

O React Native possui uma interface de linha de comando integrada, que você pode usar para gerar um novo projeto. Você pode acessá-lo sem instalar nada globalmente usando ``` npx```, que acompanha o Node.js. Vamos criar um novo projeto React Native chamado "NewProject"  (mude esse nome de acordo com o seu projeto):

```properties
npx react-native init NewProject

cd NewProject
```

##### Iniciar o metrô

Primeiro, você precisará iniciar o Metro, o bundler JavaScript que acompanha o React Native. Metro "recebe um arquivo de entrada e várias opções e retorna um único arquivo JavaScript que inclui todo o seu código e suas dependências." — [Metro Docs](https://facebook.github.io/metro/docs/concepts)

Para iniciar o Metro, execute ```npx react-native start``` dentro da pasta do projeto React Native:

```properties
npx react-native start
```

```react-native start``` inicia o Metro Bundler.

> Se você usar o gerenciador de pacotes Yarn, poderá usar ```yarn``` em vez de ```npx``` ao executar comandos React Native dentro de um projeto existente.

> Se você estiver familiarizado com desenvolvimento web, Metro é muito parecido com webpack—para aplicativos React Native. Ao contrário de Kotlin ou Java, o JavaScript não é compilado – e nem o React Native. Agrupar não é o mesmo que compilar, mas pode ajudar a melhorar o desempenho da inicialização e traduzir alguns JavaScript específicos da plataforma em JavaScript com suporte mais amplo.

##### Iniciar seu aplicativo

Deixe o Metro Bundler rodar em seu próprio terminal. Abra um novo terminal dentro da pasta do projeto React Native. Execute o seguinte:

```properties
npx react-native run-android
```

Se tudo estiver configurado corretamente, você verá seu novo aplicativo em execução no emulador do Android em breve.

```npx react-native run-android``` é uma maneira de executar seu aplicativo - você também pode executá-lo diretamente no Android Studio.

> Se você não conseguir fazer isso funcionar, consulte a página de solução de [problemas](https://reactnative.dev/docs/troubleshooting) ou [Documentação de Configuração React Native](https://reactnative.dev/docs/environment-setup).

## Dependências

| Tipo        | Dependência                                            | Versão      | Comando de instalação                                               |
| ----------- | ------------------------------------------------------ | ----------- | ------------------------------------------------------------------- |
| Production  | [@mdi/js][Production_1]                                | ^7.0.96     | ```npm i @mdi/js@^7.0.96```                                         |
| Production  | [react][Production_2]                                  | 18.1.0      | ```npm i react@^18.1.0```                                           |
| Production  | [react-native][Production_3]                           | 0.70.1      | ```npm i react-native@0.70.1```                                     |
| Production  | [react-native-linear-gradient][Production_4]           | ^2.6.2      | ```npm i react-native-linear-gradient@^2.6.2```                     |
| Production  | [react-native-paper][Production_5]                     | ^5.0.0-rc.6 | ```npm i react-native-paper@^5.0.0-rc.6```                          |
| Production  | [react-native-svg][Production_6]                       | ^13.2.0     | ```npm i react-native-svg@^13.2.0```                                |
| Production  | [typescript][Production_7]                             | ^4.8.4      | ```npm i typescript@^4.8.4```                                       |
|             |                                                        |             |                                                                     |
| Development | [@babel/core][Development_1]                           | ^7.12.9     | ```npm i @babel/core@^7.12.9 --save-dev```                          |
| Development | [@babel/runtime][Development_2]                        | ^7.12.5     | ```npm i @babel/runtime@^7.12.5 --save-dev```                       |
| Development | [@react-native-community/eslint-config][Development_3] | ^2.0.0      | ```npm i @react-native-community/eslint-config@^2.0.0 --save-dev``` |
| Development | [babel-jest][Development_4]                            | ^26.6.3     | ```npm i babel-jest@^26.6.3 --save-dev```                           |
| Development | [babel-plugin-module-resolver][Development_5]          | ^4.1.0      | ```npm i babel-plugin-module-resolver@^4.1.0 --save-dev```          |
| Development | [eslint][Development_6]                                | ^7.32.0     | ```npm i eslint@^7.32.0 --save-dev```                               |
| Development | [jest][Development_7]                                  | ^26.6.3     | ```npm i jest@^26.6.3 --save-dev```                                 |
| Development | [metro-react-native-babel-preset][Development_8]       | ^0.72.1     | ```npm i metro-react-native-babel-preset@^0.72.1 --save-dev```      |
| Development | [postcss][Development_9]                               | ^8.4.16     | ```npm i postcss@^8.4.16 --save-dev```                              |
| Development | [postcss-css-variables][Development_10]                | ^0.18.0     | ```npm i postcss-css-variables@^0.18.0 --save-dev```                |
| Development | [react-native-postcss-transformer][Development_11]     | ^1.2.4      | ```npm i react-native-postcss-transformer@^1.2.4 --save-dev```      |
| Development | [react-native-sass-transformer][Development_12]        | ^2.0.0      | ```npm i react-native-sass-transformer@^2.0.0 --save-dev```         |
| Development | [react-test-renderer][Development_13]                  | 18.1.0      | ```npm i react-test-renderer@18.1.0 --save-dev```                   |
| Development | [sass][Development_14]                                 | ^1.55.0     | ```npm i sass@^1.55.0 --save-dev```                                 |
| Development  | [@tsconfig/react-native][Development_15]                 | ^2.0.2      | ```npm i @tsconfig/react-native@^2.0.2 --save-dev```                           |
| Development  | [babel-plugin-module-resolver][Development_16]                 | ^4.1.0      | ```npm i babel-plugin-module-resolver@^4.1.0 --save-dev```                           |

> As seguintes dependências exigem configuração especial para um funcionamento adequado:
> - [sass][Development_14]
> - [react-native-sass-transformer][Development_12]
> - [postcss][Development_9]
> - [postcss-css-variables][Development_10]

> Para adiantar o serviço, faça o download dos seguintes arquivos na raiz do projeto:
> [./transformer.js](./transformer.js)
> [./postcss.config.js](./transformer.js)
>
> Em Em seguida, no arquivo ```./metro.config.js``` na raiz do seu projeto, adicione o seguinte trecho de código:
> ```js
> const { getDefaultConfig } = require("metro-config");
> 
> module.exports = (async () => {
>  const {
>    resolver: { sourceExts }
>  } = await getDefaultConfig();
>  return {
>    transformer: {
>      babelTransformerPath: require.resolve("./transformer.js")
>    },
>    resolver: {
>      sourceExts: [...sourceExts, "scss", "sass"]
>    }
>  };
>})();
> ```

> Para um bom aproveito desse projeto, será necessário o uso do arquivo [tsconfig.json](./tsconfig.json) e poucas configurações no arquivo [babel.config.js](./babel.config.js). Mas, antes disso,certifique-se que tenha instalado as dependências [typescript][Production_7], [@tsconfig/react-native][Development_15] e [babel-plugin-module-resolver][Development_16].
> 
> Se em seu projeto já houver o arquivo `tsconfig.json`, certifique-se se possui chaves e valores semelhante ao exemplo:
> ```js
> {
>  "extends": "@tsconfig/react-native/tsconfig.json",
>  "$schema": "https://json.schemastore.org/tsconfig",
>  "compilerOptions": {
>    "target": "esnext",
>    "module": "commonjs",
>    "types": ["jest"],
>    "lib": ["es2019"],
>    "allowJs": true,
>    "jsx": "react-native",
>    "noEmit": true,
>    "isolatedModules": true,
>    "strict": true,
>    "moduleResolution": "node",
>    "resolveJsonModule": true,
>    "allowSyntheticDefaultImports": true,
>    "forceConsistentCasingInFileNames": true,
>    "esModuleInterop": true,
>    "skipLibCheck": false,
>    "noFallthroughCasesInSwitch": true,
>    "noImplicitAny": true,
>    "removeComments": true,
>    "preserveConstEnums": true,
>    "sourceMap": false,
>    "baseUrl": "./",
>    "paths": {
>      "*": ["solutions/*", "src/*"]
>    }
>  },
>  "include": ["solutions/**/*", "src/**/*"],
>  "exclude": []
> }
> ```
> 
> Já no arquivo `babel.config.js`, certifique-se se possui chaves e valores semelhante ao exemplo:
> ```js
> {
> //...
>   plugins: [
>       //...
>       ['module-resolver', {
>           root: [
>               "./src", "./solutions"
>           ],
>           //...
>       }],
>       //...
>   ],
> //...
> }
> ```


[Production_1]:https://www.npmjs.com/package/@mdi/js
[Production_2]:https://www.npmjs.com/package/react
[Production_3]:https://www.npmjs.com/package/react-native
[Production_4]:https://www.npmjs.com/package/react-native-linear-gradient
[Production_5]:https://www.npmjs.com/package/react-native-paper
[Production_6]:https://www.npmjs.com/package/react-native-svg
[Production_7]:https://www.npmjs.com/package/typescript

[Development_1]:https://www.npmjs.com/package/@babel/core
[Development_2]:https://www.npmjs.com/package/@babel/runtime
[Development_3]:https://www.npmjs.com/package/@react-native-community/eslint-config
[Development_4]:https://www.npmjs.com/package/babel-jest
[Development_5]:https://www.npmjs.com/package/babel-plugin-module-resolver
[Development_6]:https://www.npmjs.com/package/eslint
[Development_7]:https://www.npmjs.com/package/jest
[Development_8]:https://www.npmjs.com/package/metro-react-native-babel-preset
[Development_9]:https://www.npmjs.com/package/postcss
[Development_10]:https://www.npmjs.com/package/postcss-css-variables
[Development_11]:https://www.npmjs.com/package/react-native-postcss-transformer
[Development_12]:https://www.npmjs.com/package/react-native-sass-transformer
[Development_13]:https://www.npmjs.com/package/react-test-renderer
[Development_14]:https://www.npmjs.com/package/sass
[Development_15]:https://www.npmjs.com/package/@tsconfig/react-native
[Development_16]:https://www.npmjs.com/package/babel-plugin-module-resolver
