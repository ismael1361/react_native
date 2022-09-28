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

| Tipo        | Dependência                                                                                                  | Versão      | Comando de instalação                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------- |
| Production  | [@mdi/js](https://www.npmjs.com/package/@mdi/js)                                                             | ^7.0.96     | ```npm i @mdi/js@^7.0.96```                                         |
| Production  | [react](https://www.npmjs.com/package/react)                                                                 | 18.1.0      | ```npm i react@^18.1.0```                                           |
| Production  | [react-native](https://www.npmjs.com/package/react-native)                                                   | 0.70.1      | ```npm i react-native@0.70.1```                                     |
| Production  | [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient)                   | ^2.6.2      | ```npm i react-native-linear-gradient@^2.6.2```                     |
| Production  | [react-native-paper](https://www.npmjs.com/package/react-native-paper)                                       | ^5.0.0-rc.6 | ```npm i react-native-paper@^5.0.0-rc.6```                          |
| Production  | [react-native-svg](https://www.npmjs.com/package/react-native-svg)                                           | ^13.2.0"    | ```npm i react-native-svg@^13.2.0```                                |
|             |                                                                                                              |             |                                                                     |
| Development | [@babel/core](https://www.npmjs.com/package/@babel/core)                                                     | ^7.12.9     | ```npm i @babel/core@^7.12.9 --save-dev```                          |
| Development | [@babel/runtime](https://www.npmjs.com/package/@babel/runtime)                                               | ^7.12.5     | ```npm i @babel/runtime@^7.12.5 --save-dev```                       |
| Development | [@react-native-community/eslint-config](https://www.npmjs.com/package/@react-native-community/eslint-config) | ^2.0.0      | ```npm i @react-native-community/eslint-config@^2.0.0 --save-dev``` |
| Development | [babel-jest](https://www.npmjs.com/package/babel-jest)                                                       | ^26.6.3     | ```npm i babel-jest@^26.6.3 --save-dev```                           |
| Development | [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)                   | ^4.1.0      | ```npm i babel-plugin-module-resolver@^4.1.0 --save-dev```          |
| Development | [eslint](https://www.npmjs.com/package/eslint)                                                               | ^7.32.0     | ```npm i eslint@^7.32.0 --save-dev```                               |
| Development | [jest](https://www.npmjs.com/package/jest)                                                                   | ^26.6.3     | ```npm i jest@^26.6.3 --save-dev```                                 |
| Development | [metro-react-native-babel-preset](https://www.npmjs.com/package/metro-react-native-babel-preset)             | ^0.72.1     | ```npm i metro-react-native-babel-preset@^0.72.1 --save-dev```      |
| Development | [postcss](https://www.npmjs.com/package/postcss)                                                             | ^8.4.16     | ```npm i postcss@^8.4.16 --save-dev```                              |
| Development | [postcss-css-variables](https://www.npmjs.com/package/postcss-css-variables)                                 | ^0.18.0     | ```npm i postcss-css-variables@^0.18.0 --save-dev```                |
| Development | [react-native-postcss-transformer](https://www.npmjs.com/package/react-native-postcss-transformer)           | ^1.2.4      | ```npm i react-native-postcss-transformer@^1.2.4 --save-dev```      |
| Development | [react-native-sass-transformer](https://www.npmjs.com/package/react-native-sass-transformer)                 | ^2.0.0      | ```npm i react-native-sass-transformer@^2.0.0 --save-dev```         |
| Development | [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)                                     | 18.1.0      | ```npm i react-test-renderer@18.1.0 --save-dev```                   |
| Development | [sass](https://www.npmjs.com/package/sass)                                                                   | ^1.55.0     | ```npm i sass@^1.55.0 --save-dev```                                 |

> As seguintes dependências exigem configuração especial para um funcionamento adequado:
> - [sass](https://www.npmjs.com/package/sass)
> - [react-native-sass-transformer](https://www.npmjs.com/package/react-native-sass-transformer)
> - [postcss](https://www.npmjs.com/package/postcss)
> - [postcss-css-variables](https://www.npmjs.com/package/postcss-css-variables)

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