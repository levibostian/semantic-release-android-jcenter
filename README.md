[![Travis](https://travis-ci.com/levibostian/semantic-release-android-jcenter.svg?branch=master)](https://travis-ci.org/levibostian/semantic-release-android-jcenter)
[![npm latest version](https://img.shields.io/npm/v/semantic-release-android-jcenter/latest.svg)](https://www.npmjs.com/package/semantic-release-android-jcenter)

# semantic-release-android-jcenter

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to deploy an Android library to the JCenter Maven repository (well, technically we deploy to a [Bintray](https://bintray.com) Maven repository which can then get accepted into JCenter. See [this faq](https://github.com/levibostian/Android-JCenter#faq) to learn more).

> Tip: If you're an Android developer and you are not sure where to start to get your Android library into JCenter, [check out this project](https://github.com/levibostian/Android-JCenter) to help you out. If you use that guide, you can use this plugin with ease. 

| Step               | Description                                                                      |
|--------------------|----------------------------------------------------------------------------------|
| `verifyConditions` | Verify Gradle `bintrayUpload` task exists, make sure authenticated with Bintray. |
| `prepare`          | Update the `gradle.properties` version.                                          |
| `publish`          | Run `./gradlew bintrayUpload` to deploy to Bintray.                              |

## Install

```bash
$ npm install semantic-release-android-jcenter -D
```

## Requirements 

> Tip: If you followed [this guide](https://github.com/levibostian/Android-JCenter) you have met all of the requirements. 

The only requirements of this project is...
1. The gradle task `bintrayUpload` is installed.  
2. You define the version of your code in the project's `gradle.properties` file like this:
```
version=1.0.0
```
> Tip: You can reference this value in your `build.gradle` files with `project.findProperty('version')`

## Usage

1. Make sure to install the Bintray gradle plugin and Android Maven plugin. This document does not cover how to do this as (1) there are multiple ways to do this and (2) it's better documented elsewhere. Check out [this guide](https://github.com/levibostian/Android-JCenter) to help you out. 

2. You need to be authenticated with Bintray. You can do this via [environment variables or a gradle config file](https://github.com/bintray/gradle-bintray-plugin#step-3-add-the-bintray-configuration-closure-to-your-buildgradle-file). 

3. Setup each of your Android library modules in your Android Studio project to deploy to Bintray. 

## Configuration

#### Disable Bintray uploading for module 

If there is a module that you do not want deployed, then make sure to disable Bintray uploading in the module's `build.gradle` file. Because you have the option to enable Bintray uploading for each module individually, this plugin is designed to run the Bintray upload Gradle task against all of your modules with the Bintray upload plugin installed. 

### Options

| Options            | Description                                                                               | Default  |
|--------------------|-------------------------------------------------------------------------------------------|----------|
| `checkAuthEnvVars` | Whether to check if `BINTRAY_USERNAME` and `BINTRAY_KEY` set to authenticate with Bintray | `true`   |

##### Examples

Here is an example on how to set options 

```json
{
  "plugins": [
    ["semantic-release-android-jcenter", {
      "checkAuthEnvVars": false
    }]
  ]
}
```
