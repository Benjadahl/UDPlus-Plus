#Start message for user convenience
echo Building UD++

#The curly brackets supress command output
{
  #Delete leftover build
  rm ./bin/UD++.zip

  #Create the folder for the temporary build files
  mkdir UD++

  #Copy the source files into the temporary folder
  cp -r ./src/* ./UD++

  #Delte the tests folder, as these are not to be included in production builds
  rm -rf ./UD++/tests/

  #Zip compress the folder, and put the result in ./bin/UD++.zip
  zip -r ./bin/UD++ UD++/

  #Delte the temporary folder
  rm -rf ./UD++
} &> /dev/null
#End message for user convenience
echo UD++ build finished!
