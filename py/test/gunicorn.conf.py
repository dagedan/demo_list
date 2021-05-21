import os
_file_name = os.path.basename(__file__)
path_of_current_file = os.path.abspath(__file__)
path_of_current_dir = os.path.split(path_of_current_file)[0]
workers = 5    # 定义同时开启的处理请求的进程数量，根据网站流量适当调整
# worker_class = "gevent"   # 采用gevent库，支持异步处理请求，提高吞吐量
bind = "0.0.0.0:5000"
errorlog = '%s/logs/%s_error.log' % (path_of_current_dir, _file_name)
accesslog = '%s/logs/%s_access.log' % (path_of_current_dir, _file_name)