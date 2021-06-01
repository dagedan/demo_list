from django.db import models


# Create your models here.
class BookInfo(models.Model):
	name = models.CharField(max_length=10, unique=True, verbose_name="著作名称")
	description = models.CharField(max_length=200, null=True, verbose_name="著作描述")
	read_count = models.IntegerField(default=0, verbose_name="阅读次数")
	pub_time = models.DateTimeField(null=True, verbose_name="发布时间")
	is_delete = models.BooleanField(default=False, verbose_name="删除标记")

	class Meta:
		db_table = "book_info"

	def __str__(self):
		return self.name


class PeopleInfo(models.Model):
	GENDER = (
		(0, 'male'),
		(1, 'female')
	)
	name = models.CharField(max_length=10, verbose_name="人物")
	book = models.ForeignKey(BookInfo, on_delete=models.CASCADE, default=0, verbose_name="所属著作外键")
	description = models.CharField(max_length=200, null=True, verbose_name="人物描述")
	gender = models.SmallIntegerField(choices=GENDER, default=0, verbose_name="性别")
	is_delete = models.BooleanField(default=False, verbose_name="删除标记")

	class Meta:
		db_table = 'people_info'

	def __str__(self):
		return self.name
