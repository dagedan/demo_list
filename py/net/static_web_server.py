import socket
import threading


def task(new_socket, ip_port):
	recv_data = new_socket.recv(4096)
	if len(recv_data) == 0:
		new_socket.close()
		return
	path = recv_data.decode('utf-8').split(" ", maxsplit=2)[1]
	print(path)
	try:
		with open('static' + ('/index.html' if path == '/' else path), 'rb') as file:
			file_data = file.read()
	except Exception as e:
		with open('static' + '/404.html', 'rb') as file:
			file_data = file.read()
		# new_socket.send(file_data.encode('utf-8'))
		# 响应行
		response_line = 'HTTP/1.1 404 not found\r\n'
		# 响应头
		response_header = "Server: PWS/1.0\r\n"
		# 响应体
		response_body = file_data
		response_data = (response_line + response_header + "\r\n").encode('utf-8') + response_body
		new_socket.send(response_data)
	else:
		# new_socket.send(file_data.encode('utf-8'))
		# 响应行
		response_line = 'HTTP/1.1 200 OK\r\n'
		# 响应头
		response_header = "Server: PWS/1.0\r\n"
		# 响应体
		response_body = file_data
		response_data = (response_line + response_header + "\r\n").encode('utf-8') + response_body
		new_socket.send(response_data)
	finally:
		new_socket.close()


def main():
	server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
	server.bind(("", 9527))
	server.listen(128)
	while True:
		new_socket, ip_port = server.accept()
		new_thread = threading.Thread(target=task, args=(new_socket, ip_port))
		new_thread.daemon = True
		new_thread.start()


if __name__ == '__main__':
	main()
