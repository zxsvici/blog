graph TD;
A[Producer] -->|发送消息| B((Broker));
B -->|写入消息到Leader| C[Leader];
C -->|写入成功| D[Broker];
D -->|返回ACK| A;
D -->|消息同步到Replicas| E[Replicas];
E -->|写入成功| F[Broker];
F -->|返回ACK| A;