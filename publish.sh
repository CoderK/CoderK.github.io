#!/bin/bash

git checkout develop
git branch -D master
git checkout -b master
git filter-branch --subdirectory-filter _site/ -f
git push --all
git checkout develop
