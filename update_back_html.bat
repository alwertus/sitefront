cls
set front_folder=%~dp0
rem cd %front_folder%/../siteback/
rem set back_folder=%CD%\
set back_folder=d:\Alwertus\Project\Java\Projects\Teaching\siteback\

cd %front_folder%

RD /S /Q %back_folder%html
mkdir %back_folder%html
xcopy /s %front_folder%build\* %back_folder%html
:end