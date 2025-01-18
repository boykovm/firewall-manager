#!/bin/sh

if ! command -v ufw
then
  echo "Install ufw? Y/N"
  read installUfw
  installUfw="${installUfw:=Y}"
  if [ $installUfw = 'Y' ] ||[ $installUfw = 'y' ]
  then
    echo "Run apt-get update? Y/N"
    read updateApt
    updateApt="${updateApt:=Y}"
    if [ $updateApt = 'Y' ] || [ $updateApt = 'y' ]
    then
      sudo apt-get update
    fi
      sudo apt-get install ufw
  else
    echo "Bye"
    exit
  fi
else
  echo "ufw is already installed, Bye"
  exit
fi

