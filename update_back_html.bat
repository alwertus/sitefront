cls
set front_folder=%~dp0
cd %front_folder%/../siteback/
set back_folder=%CD%\
rem set back_folder=d:\Alwertus\Project\Java\Projects\Teaching\siteback\

cd %front_folder%

RD /S /Q %back_folder%html
mkdir %back_folder%html
xcopy /s %front_folder%build\* %back_folder%html
:end