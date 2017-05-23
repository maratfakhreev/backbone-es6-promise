# Contributing

1. Fork the project.
2. Compile the project on your machine `npm run compile`.
3. Make sure the tests pass: `npm test`.
4. Make your change. Add tests for your change when necessary. Make the tests pass: `npm test`.
5. Push to your fork and [submit a pull request](https://help.github.com/articles/creating-a-pull-request/) (bonus points for topic branches).

## Releases

We strictly follow [Semantic Versioning](http://semver.org/)

1. Make sure that tests are green.
2. Update project version in package.json
3. Tag the release by running `git tag v<version>`. Push the tag: `git push --tags`.
4. Verify that everything was pushed correctly on the Github: https://github.com/maratfakhreev/backbone-es6-promise/releases
5. Run `npm publish`
