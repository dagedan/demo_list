# Generated by Django 3.2.3 on 2021-06-01 03:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BookInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10, unique=True, verbose_name='著作名称')),
                ('description', models.CharField(max_length=200, null=True, verbose_name='著作描述')),
                ('read_count', models.IntegerField(default=0, verbose_name='阅读次数')),
                ('pub_time', models.DateTimeField(null=True, verbose_name='发布时间')),
                ('is_delete', models.BooleanField(default=False, verbose_name='删除标记')),
            ],
            options={
                'db_table': 'book_info',
            },
        ),
        migrations.CreateModel(
            name='PeopleInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10, verbose_name='人物')),
                ('description', models.CharField(max_length=200, null=True, verbose_name='人物描述')),
                ('gender', models.SmallIntegerField(choices=[(0, 'male'), (1, 'female')], default=0, verbose_name='性别')),
                ('is_delete', models.BooleanField(default=False, verbose_name='删除标记')),
                ('book', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='book.bookinfo', verbose_name='所属著作外键')),
            ],
            options={
                'db_table': 'people_info',
            },
        ),
    ]
