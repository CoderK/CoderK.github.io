#!/bin/bash

git checkout develop
git branch -D main
git checkout -b main
git filter-branch --subdirectory-filter _site/ -f
git push --all -f
git checkout develop
