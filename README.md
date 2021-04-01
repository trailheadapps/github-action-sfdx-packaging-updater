# sfdx-packaging-updater

This Github Action is a helper action to extract remove not needed package versions from the `sfdx-project.json` file. It also updates any references in the README to the latest available package version.

## Outputs

This action provides one output:

-   `isSuccess` - true if the result status code equals 0.

## Example

```yml
# Update sfdx-project.json and README to use only latest package version
- name: 'Extract package:version:create result data'
  id: packaging-updater
  uses: trailheadapps/github-action-sfdx-packaging-updater
```
