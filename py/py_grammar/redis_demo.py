import redis

if __name__ == '__main__':
	r = redis.Redis(host='127.0.0.1', port=6379, db=0)
	r.set('foo', 'bar')
	result = r.get('foo')
	print(result.decode('utf-8'))
