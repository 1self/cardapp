#!/usr/bin/env bash
export $(cat .env | xargs) && grunt 
