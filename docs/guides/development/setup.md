# Setup your environment

## Prerequisites

Install the prerequisites for the KDK, available [here](https://kalisio.github.io/kdk/guides/development/setup.html).

### Install Cordova ecosystem

Follow this [tutorial](https://evothings.com/doc/build/cordova-install-windows.html).

## Web app

Please [follow the installation from source code guide](../installing-kapp.md#from-source-code).

## Cordova wrapper

Follow [Quasar guide](https://quasar.dev/quasar-cli/developing-cordova-apps/introduction).

Under Windows you might have somme issue creating a symbolic link. First you need to have administrator privileges in your shell. Then  the easy way is to use the [PowerShell Community Extensions](http://pscx.codeplex.com/) and the `New-SymLink dir link_target` command. The environment variable `PSModulePath` needs to be updated to add the path to the extension (eg `C:\Program Files (x86)\PowerShell Community Extensions\Pscx3\Pscx`) and the command should be run as administrator or your user should have [appropriate rights](http://superuser.com/questions/104845/permission-to-make-symbolic-links-in-windows-7).

If you have some issue about *You have not accepted the license agreements of the following SDK components...* you need to update first your installed SDKs through *Android Studio > Configure > SDK Manager > Install*. You might need to do it multiple times since the last version of a SDK only appear for download when previous version dependencies are installed.

To have a viable emulator install [HAXM](https://software.intel.com/en-us/articles/intel-hardware-accelerated-execution-manager-intel-haxm).
