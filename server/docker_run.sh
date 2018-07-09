#!/bin/bash
docker run \
        -e "mysqlHost=MySQL 数据库主机地址" \
        -e "mysqlPort=MySQL 数据库端口号" \
        -e "mysqlUser=MySQL 数据库帐号" \
        -e "mysqlPassword=MySQL 数据库帐号密码" \
        -e "mysqlDatabase=MySQL 数据库中的 schema 名" \
        --rm \
        -it \
        docker.baijie.gq/ticket/api \
        "$@"
