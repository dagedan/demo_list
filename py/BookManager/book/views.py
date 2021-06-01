from django.db.models import F, Q, Sum
from django.http import HttpResponse
from book.models import BookInfo, PeopleInfo
import datetime


def index(request):
    books = BookInfo.objects.all()
    context = {
        'books': books
    }
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)


def add_book(request):
    BookInfo.objects.create(
        name="笑傲江湖",
        pub_time="1996-01-01 12:12:01",
        description="飞狐外传345345"
    )
    book = BookInfo.objects.get(id=10)
    PeopleInfo.objects.create(
        name="双儿",
        gender=0,
        book=book,
        description="123韦小宝123"
    )


def update_book(request):
    BookInfo.objects.filter(id=1).update(
        name="飞狐外传123",
        pub_time="1996-01-01 12:12:01",
        description="飞狐外传",
        read_count=100
    )


def delete_book(request):
    BookInfo.objects.filter(id=1).delete()
"""
    基本查询
        1、get得到一个数据,需要捕获异常 DoesNotExist
        2、all所有
        3、count数量
    相当于where的查询
        1、filter 筛选0-n个结果
        2、get 返回一个结果
        3、exclude 排除符合条件后剩下的结果，相当于not
    F对象和Q对象
        1、查询阅读量大于2倍id的数据（F对象）
        2、查询id大于2并且阅读量大于20的数据（可以尝试两次filter）
        3、查询id大于2或者阅读量大于20的数据（Q对象:或、与、非）
            Q()|Q()  或者 Q()&Q() ~Q()
    聚合查询
        聚合函数：Sum、Max、Min、Avg、Count
        aggregate(聚合函数('字段'))
    排序
        BookInfo.objects.all().order_by('id')
        BookInfo.objects.all().order_by('-id')
    关联查询
        1、查询书籍id为10的所有人物信息
            book = BookInfo.objects.get(id=10)
            book.peopleinfo_set.all()
        2、查询人物为1的书籍
            people = PeopleInfo.objects.get(id=1)
            people.book.name
        3、查询图书，要求任务为韦小宝
            BookInfo.objects.filter(peopleinfo__name__exact="韦小宝")
        4、查询图书，要求图书中人物的描述包含xxx
            BookInfo.objects.filter(peopleinfo__description__contains="小")
        5、查询书名为鹿鼎记的所有人物
            PeopleInfo.objects.filter(book__name__exact="鹿鼎记")      
        6、查询阅读量大于30的所有人物
            PeopleInfo.objects.filter(book__read_count__gt=10)   
"""


def get_one(request):
    try:
        book = BookInfo.objects.get(id=10)
        book.peopleinfo_set.all()
    except BookInfo.DoesNotExist as e:
        print(e)


def count(request):
    BookInfo.objects.count()


def adv_filter(request):
    BookInfo.objects.filter(id=5)
    BookInfo.objects.filter(id__exact=5)
    BookInfo.objects.filter(name__contains="传")
    BookInfo.objects.filter(name__endswith="传")
    BookInfo.objects.filter(name__isnull=True)
    BookInfo.objects.filter(id__in=(1, 4, 6, 5))
    # gt 大于
    # gte 大于等于
    # lt 小于
    # lte 小于等于
    BookInfo.objects.filter(id__gte=3)
    BookInfo.objects.filter(id__lt=3)
    BookInfo.objects.filter(pub_time__year=1996)
    BookInfo.objects.filter(pub_time__gt="1996-10-11 12:11:11")

    # 不等于
    BookInfo.objects.exclude(id=4)


def f_object_query(request):
    # 查询阅读量大于2倍id的图书
    BookInfo.objects.filter(read_count__gt=F("id")*2)


def q_object_query(request):
    BookInfo.objects.filter(Q(id__gt=3) | Q(read_count__lt=10))


def sum_aggregate(request):
    BookInfo.objects.aggregate(Sum('id'))


