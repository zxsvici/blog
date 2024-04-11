#!/usr/bin/env bash

BIN_PATH=$(cd "$(dirname "$0")"; pwd)
OUT_FILE="$BIN_PATH/../app.out"
PID_FILE="$BIN_PATH/../app.pid"
CONF_PATH="$BIN_PATH/../conf"
LIBS_PATH="$BIN_PATH/../libs"
SPRING_PROFILE="$(env | grep ^spring\\.profiles\\.active= | cut -d= -f2-)"
MAIN_CLASS=`cat ${BIN_PATH}/main_class`

# print usage
function print_usage(){
    echo "Usage: service [-f] COMMAND"
    echo "    where COMMAND is one of:"
    echo "      start [daemon]        start the service"
    echo "      stop          stop the service"
    echo "      restart  [daemon]     restart the service"
}

# start
function start(){
    CLASSPATH="$CONF_PATH/:$LIBS_PATH/*"
    if [ -f "$OUT_FILE" ]; then
        mv -f "$OUT_FILE" "$OUT_FILE"_$(date +%Y%m%d%H%M%S)
    fi
    SPRING_PROFILE=${SPRING_PROFILE:=prod}
    daemon=$1
    if [ "$daemon" == true ]; then
        if [ "$SW_AGENT_ENABLE" == true ]; then
           nohup java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=${SPRING_PROFILE}  -javaagent:$SW_AGENT_JAR -classpath $CLASSPATH ${MAIN_CLASS} >/dev/null 2>&1 &
        else
           nohup java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=${SPRING_PROFILE}  -classpath $CLASSPATH ${MAIN_CLASS} >/dev/null 2>&1 &
           echo $! > ${PID_FILE}
        fi
    else
        if [ "$SW_AGENT_ENABLE" == true ]; then
            java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=${SPRING_PROFILE}  -javaagent:$SW_AGENT_JAR -classpath $CLASSPATH ${MAIN_CLASS}
        else
            java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=${SPRING_PROFILE}  -classpath $CLASSPATH ${MAIN_CLASS}
        fi
    fi

}

# check pid exists
function existPid() {
    P=$1
    if [ -n "$P" ]; then
        E=$(ps ax | awk '{ print $1 }' | grep -e "^${P}$")
        if [ -n "$E" ]; then
            echo 1
        else
            echo 0
        fi
    else
        echo 0
    fi
}
# stop
function stop() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if [ -n "$PID" ]; then
            if [ $(existPid "$PID") ];then
                echo -e "Stop service, pid=$PID \c"
                while [ $(existPid "$PID") = 1 ]
                do
                    kill -9 "$PID"
                    echo -e ".\c"
                    sleep 1s
                done
                rm -f "$PID_FILE"
                echo " stopped."
            else
                rm -f "$PID_FILE"
                echo "No service to stop. process $PID not exists."
            fi
        else
            rm -f "$PID_FILE"
            echo "No service to stop. pid file empty."
        fi
    else
        echo "No service to stop. pid file not exist."
    fi
}

if [ $# -eq 0 ]; then
    print_usage
    exit
fi

COMMAND=$1
# check command
case $COMMAND in
    # usage flags
    --help|-help|-h)
        print_usage
        exit
        ;;
    -f)
        FORCE=1
        shift
        COMMAND=$1
        ;;
esac
# execute command
daemon=false
if [ "$2" == "daemon" ]; then
  daemon=true
fi

case $COMMAND in
    start)
        if [ -f "$PID_FILE" ]; then
            if [ "$FORCE" ]; then
                stop
            else
                echo "Cannot start. exists pid file $PID_FILE"
                exit
            fi
        fi
        start $daemon
        exit 0
        ;;
    stop)
        stop
        exit 0
        ;;
    restart)
        stop
        start $daemon
        exit 0
        ;;
    *)
        print_usage
        exit
        ;;
esac