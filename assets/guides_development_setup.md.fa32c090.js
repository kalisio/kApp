import{_ as e,o as a,c as t,Q as o}from"./chunks/framework.d2db4bec.js";const f=JSON.parse('{"title":"Setup your environment","description":"","frontmatter":{},"headers":[],"relativePath":"guides/development/setup.md","filePath":"guides/development/setup.md"}'),r={name:"guides/development/setup.md"},s=o('<h1 id="setup-your-environment" tabindex="-1">Setup your environment <a class="header-anchor" href="#setup-your-environment" aria-label="Permalink to &quot;Setup your environment&quot;">​</a></h1><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>Install the prerequisites for the KDK, available <a href="https://kalisio.github.io/kdk/guides/development/setup.html" target="_blank" rel="noreferrer">here</a>.</p><h3 id="install-cordova-ecosystem" tabindex="-1">Install Cordova ecosystem <a class="header-anchor" href="#install-cordova-ecosystem" aria-label="Permalink to &quot;Install Cordova ecosystem&quot;">​</a></h3><p>Follow this <a href="https://evothings.com/doc/build/cordova-install-windows.html" target="_blank" rel="noreferrer">tutorial</a>.</p><h2 id="web-app" tabindex="-1">Web app <a class="header-anchor" href="#web-app" aria-label="Permalink to &quot;Web app&quot;">​</a></h2><p>Please <a href="./../installing-kapp.html#from-source-code">follow the installation from source code guide</a>.</p><h2 id="cordova-wrapper" tabindex="-1">Cordova wrapper <a class="header-anchor" href="#cordova-wrapper" aria-label="Permalink to &quot;Cordova wrapper&quot;">​</a></h2><p>Follow <a href="https://quasar.dev/quasar-cli/developing-cordova-apps/introduction" target="_blank" rel="noreferrer">Quasar guide</a>.</p><p>Under Windows you might have somme issue creating a symbolic link. First you need to have administrator privileges in your shell. Then the easy way is to use the <a href="http://pscx.codeplex.com/" target="_blank" rel="noreferrer">PowerShell Community Extensions</a> and the <code>New-SymLink dir link_target</code> command. The environment variable <code>PSModulePath</code> needs to be updated to add the path to the extension (eg <code>C:\\Program Files (x86)\\PowerShell Community Extensions\\Pscx3\\Pscx</code>) and the command should be run as administrator or your user should have <a href="http://superuser.com/questions/104845/permission-to-make-symbolic-links-in-windows-7" target="_blank" rel="noreferrer">appropriate rights</a>.</p><p>If you have some issue about <em>You have not accepted the license agreements of the following SDK components...</em> you need to update first your installed SDKs through <em>Android Studio &gt; Configure &gt; SDK Manager &gt; Install</em>. You might need to do it multiple times since the last version of a SDK only appear for download when previous version dependencies are installed.</p><p>To have a viable emulator install <a href="https://software.intel.com/en-us/articles/intel-hardware-accelerated-execution-manager-intel-haxm" target="_blank" rel="noreferrer">HAXM</a>.</p>',12),n=[s];function i(l,d,p,h,u,c){return a(),t("div",null,n)}const v=e(r,[["render",i]]);export{f as __pageData,v as default};