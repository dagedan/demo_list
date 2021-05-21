import socket

if __name__ == "__main__":
	"""
		socket.AF_INET： 使用ipv4
		socket.SOCK_STREAM: 使用tcp协议
	"""
	send_data = "我现在要发送信息了".encode('utf-8')
	client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	client.connect(('127.0.0.1', 9527))
	client.send(send_data)
	recv_data = client.recv(1024)
	print(recv_data.decode('utf-8'))
	client.close()
