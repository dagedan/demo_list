import socket

if __name__ == '__main__':
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    '''
        设置端口复用，服务端程序退出时，端口立即释放
    '''
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    server.bind(("", 9527))
    '''
        表示最大等待简历链接的个数，listen后的socket是
        被动的socket，只用来被动的接受客户端链接请求
    '''
    server.listen(128)
    new_client, addr = server.accept()
    recv_data = new_client.recv(1024)
    new_client.send('sbsbsbs'.encode('utf-8'))

    new_client.close()
    server.close()