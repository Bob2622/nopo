:: Created by npm, please don't edit manually.
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\nopo.js" %*
) ELSE (
  node "%~dp0\nopo.js" %*
)