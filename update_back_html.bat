cls
set front_folder=%~dp0

cd %front_folder%/../digimem/src/main/resources/
set back_folder=%CD%\

cd %front_folder%

RD /S /Q %back_folder%static
mkdir %back_folder%static
xcopy /s %front_folder%build\* %back_folder%static

echo Success !!!
:end