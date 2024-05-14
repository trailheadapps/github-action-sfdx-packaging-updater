const core = require('@actions/core');
const fs = require('fs');
const path = process.cwd();
const sfdxJson = require(path + '/sfdx-project.json');

async function run() {
    try {
        // Reading the content of the README file
        let readmeContent = fs.readFileSync(path + '/README.md', 'utf8');

        // We need all package directories
        const packageDirectories = sfdxJson.packageDirectories;

        packageDirectories.forEach((dir) => {
            const packageName = dir.package;
            const packageKey = packageName + '@';
            const packageVersionKeys = [];
            const packageVersionIds = [];
            Object.keys(sfdxJson.packageAliases).forEach((packageVersion) => {
                if (packageVersion.startsWith(packageKey)) {
                    packageVersionKeys.push(packageVersion);
                    packageVersionIds.push(
                        sfdxJson.packageAliases[packageVersion]
                    );
                }
            });

            // Only update package version if there's a new release
            if (packageVersionIds.length > 1) {
                const newPackageVersionId =
                    packageVersionIds[packageVersionIds.length - 1];
                // Lets pop things so that we know what to delete
                packageVersionKeys.pop();
                packageVersionIds.pop();
                // Removing all no longer needed package version keys
                packageVersionKeys.forEach((version) => {
                    delete sfdxJson.packageAliases[version];
                });
                // And we need now all IDs to replace them in the README
                packageVersionIds.forEach((id) => {
                    // If you want to use Regex to identify package version id => /04t(.*)\)/
                    readmeContent = readmeContent.replace(
                        id,
                        newPackageVersionId
                    );
                });
            }
        });

        // Writing back potential changes to the sfdx-project.json file...
        fs.writeFileSync(
            './sfdx-project.json',
            JSON.stringify(sfdxJson, null, 4).concat('\n'),
            'utf8'
        );

        // And finally we're updating the README.
        fs.writeFileSync(path + '/README.md', readmeContent, 'utf8');

        core.setOutput('isSuccess', true);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
