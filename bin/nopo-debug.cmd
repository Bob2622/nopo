:: Created by npm, please don't edit manually.
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe --debug-brk"  "%~dp0\nopo.js" %*
) ELSE (
  node --debug-brk "%~dp0\nopo.js" %*
)