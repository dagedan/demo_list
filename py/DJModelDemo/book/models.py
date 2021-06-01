from django.db import models


# Create your models here.


class BookInfo(models.Model):
	name = models.CharField(max_length=10, unique=True, verbose_name="名称")
	desc = models.CharField(max_length=80, verbose_name="描述")
	pub_time = models.DateTimeField(null=True, verbose_name="发布时间")
	read_count = models.IntegerField(default=0, verbose_name="阅读量")
	is_delete = models.BooleanField(default=False, verbose_name="删除标记")

	class Meta:
		db_table = "BookInfo"

	def __str__(self):
		return self.name


class PeopleInfo(models.Model):
	GENDER = (
		(0, "male"),
		(1, "female")
	)
	name = models.CharField(max_length=10)
	gender = models.SmallIntegerField(choices=GENDER, default=0, verbose_name="性别")
	description = models.CharField(null=True, max_length=200, verbose_name="描述")
	# 书籍-人物 是一对多的关系
	# book外键：
	# 1、CASCADE级联：删除主表数据时，连同一起删除外键表中的数据
	# 2、PROTECT保护通过抛出ProtectedError异常，来阻止主表中被外键引用的数据
	# 3、SET_NULL设置为NULL，仅在改字段NULL=True时可用
	# 4、SET_DEFAULT设置为默认值，仅在该字段设置了默认值时可用
	# 5、SET()设置特定值，货调用特定方法
	# 6、DO_NOTHING 不做任何操作，如果数据库前置指明级联性此选项会抛出IntegrityError异常
	book = models.ForeignKey(BookInfo, on_delete=models.CASCADE, default=0, verbose_name="外键BookInfo")
	is_delete = models.BooleanField(default=False, verbose_name="删除标识")

