# Instruga aplikacji przy użyciu menagera pakietów yarn

Yarn należy zainstalować globalnie przy użyciu 
	npm install --global yarn
w konsoli.
Aby sprawić wersję 
	yarn --version
Żeby włączyć aplikację w Visual Studio Code trzeba zainstalować pakiety
	yarn
	yarn Script Runner
Polecam używać cmd (command prompt) zamiast powershella w cmd

## Available Scripts

### `yarn start`

Włącza aplikację w trybie deweloperskim.
Domyślnie na serwerze  http://localhost:3000
Aplikacja posiada hot-reaload, a więc będzie się odświeżać po wprowadzeniu zmian do kodu

### `yarn install` lub `yarn` 

Instaluje wszystkie pliki wspomniane w `package.json`

### `yarn add`

Dodanie pakietu do projektu

### `yarn remove`

Usuwa pakiet z projektu

### plik `yarn.lock`

Trzyma wersje plików projektu przed aktualizacją (mogącą potencjalnie naruszyć kompatybilność projektu)


### Pozostałe funkcje opisane w domyślnym pliku README stworzynym przez yarn create-react-app. Są to funkcje związane z tworzeniem wersji produkcyjnej

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
