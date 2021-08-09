class DateJs {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(options) {
        this.inputEl = options.inputEl
        this.el = options.el
        this.inputVal = null  // input输入框值
        this.dom = null // 日期选择器
        var now = new Date() // 日期对象
        // 今天日期
        this.today = {
            nowYear: now.getFullYear(), // 年份
            nowMonth: now.getMonth() + 1, // 月份
            nowDay: now.getDate(), // 几号
            nowWeek: now.getDay(), // 星期几
            day() {
                // 补零
                return this.nowYear + '-' + this.nowMonth + '-' + this.nowDay
            }
        }
        this.weeks = ['日', '一', '二', '三', '四', '五', '六']
        this.yearDom = null // 年的元素
        this.weekDom = null // 星期的元素
        this.monthDom = null // 月份的元素
        this.currectChoiceDom = null; //选中的日期dom
        this.todayDom = null; // 今天的日期dom
        this.choiceDate = {}; //选中的日期
        this.isShow = false; // 默认不显示日期选择器，只有input框聚焦才显示.
        this.initInput()
        this.initDomBox()
        this.initDom()
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    addZero(num) {
        num = String(num);
        if (num.length == 1) {
            num = 0 + num;
        }
        return num;
    }

    // 初始化 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    initInput() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var _this = this
        // 获取输入框dom元素
        this.input = document.querySelector(this.inputEl)
        this.parent = document.querySelector(this.el);
        this.dom = document.createElement('div');
        this.parent.appendChild(this.dom);
        // 监听输入框点击 显示日历
        this.input.addEventListener('focus', function (e) {
            _this.isShow = true;
            if (_this.isShow) {
                _this.dom.style.display = 'block';
            }
        });
        // 监听文本点击 隐藏日历
        document.addEventListener('click', function (e) {
            var target = e.target;
            if (target.parentNode == null) {
                return;
            }
            while (target) {
                if (target == _this.input || target == _this.dom) {
                    return;
                }
                target = target.parentNode;
            }

            _this.isShow = false;
            if (!_this.isShow) {
                _this.dom.style.display = 'none';
            }
        })
    }
    // 星期
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    renderWeekDom() {
        var div = this.div;
        var weekDom = this.weekDom;
        weekDom.classList.add('show-week');
        var weeks = this.weeks;
        var len = weeks.length;
        var fg = document.createDocumentFragment();
        for (var i = 0; i < len; i++) {
            var dayDom = document.createElement(div);
            dayDom.classList.add('week-day');
            dayDom.innerHTML = weeks[i];
            fg.appendChild(dayDom);
        }
        weekDom.appendChild(fg);
    }
    // 创建日历元素
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    initDomBox() {
        var div = 'div';
        // 创建放置年份那一栏
        this.yearDom = document.createElement(div);
        this.yearDom.classList.add('show-year');
        // 创建放置星期那一栏
        this.weekDom = document.createElement(div);
        // 创建放置月份那一栏
        this.monthDom = document.createElement(div);
        this.monthDom.classList.add('show-month');
        this.btsDom = document.createElement(div);
        this.btsDom.classList.add('bts');
        this.dom.appendChild(this.yearDom);
        this.dom.appendChild(this.weekDom);
        this.dom.appendChild(this.monthDom);
        this.dom.appendChild(this.btsDom);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    initDom() {
        this.dom.classList.add('date-js');
        this.renderYearDom();
        this.renderWeekDom();
        this.renderMonthDom();
        this.initBtsDom();
    }
    // 创建年份选择dom
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    renderYearDom() {
        var div = 'div';
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var _this = this;
        this.showDateDom = document.createElement(div); //显示当前选中的年月
        this.showDateDom.classList.add('show-date');
        this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';

        var prevYear = document.createElement(div); //上一年
        prevYear.innerHTML = '«';
        prevYear.classList.add('change-date');
        prevYear.addEventListener('click', function () {
            _this.today.nowYear--;
            _this.currectChoiceDom = null;
            _this.renderMonthDom();
            _this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';
        });
        var prevmonth = document.createElement(div); //上一月
        prevmonth.innerHTML = '<';
        prevmonth.classList.add('change-date');
        prevmonth.addEventListener('click', function () {
            _this.today.nowMonth--;
            _this.currectChoiceDom = null;
            if (_this.today.nowMonth == 0) {
                _this.today.nowMonth = 12;
                _this.today.nowYear--;
            }
            _this.renderMonthDom();
            _this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';
        });

        var nextYear = document.createElement(div); //下一年
        nextYear.innerHTML = '»';
        nextYear.classList.add('change-date');
        nextYear.addEventListener('click', function () {
            _this.today.nowYear++;
            _this.currectChoiceDom = null;
            _this.renderMonthDom();
            _this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';
        })

        var nextmonth = document.createElement(div); //下一月
        nextmonth.innerHTML = '>';
        nextmonth.classList.add('change-date');
        nextmonth.addEventListener('click', function () {
            _this.today.nowMonth++;
            _this.currectChoiceDom = null;
            if (_this.today.nowMonth == 13) {
                _this.today.nowMonth = 1;
                _this.today.nowYear++;
            }
            _this.renderMonthDom();
            _this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';
        });
        this.yearDom.appendChild(prevYear);
        this.yearDom.appendChild(prevmonth);
        this.yearDom.appendChild(this.showDateDom);
        this.yearDom.appendChild(nextmonth);
        this.yearDom.appendChild(nextYear);

    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    renderMonthDom(self, dayCheck) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var _this = this;
        var div = 'div';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var showMonth = _this.month(_this.today.nowYear, _this.today.nowMonth);
        // 创建虚拟节点
        var fg = document.createDocumentFragment();
        var len = showMonth.length;
        for (var i = 0; i < len; i++) {
            var item = document.createElement(div);
            item.innerHTML = showMonth[i].day;
            item.classList.add('month-day');
            // 数据上不是当前月份的，那加上样式灰色
            if (showMonth[i].month != _this.today.nowMonth || showMonth[i].year != _this.today.nowYear) {
                item.classList.add('not-this-month');
            }
            // 如果是当天日子显示高亮样式
            if (!dayCheck) {
                if (showMonth[i].date == _this.today.day()) {
                    item.classList.add('today');
                }
            }

            // 元素上加属性年月
            item.setAttribute('data-month', showMonth[i].month);
            item.setAttribute('data-year', showMonth[i].year);
            // 假如数据上日期等于选中存储的日期 添加选中样式
            if (dayCheck) {
                console.log(showMonth[i].date == _this.choiceDate.date)
                if (showMonth[i].month == _this.choiceDate.month
                    && showMonth[i].year == _this.choiceDate.year
                    && showMonth[i].day == _this.choiceDate.day) {
                    item.classList.add('active');
                    // 存储dom样式
                    _this.currectChoiceDom = item;
                }
            } else if (showMonth[i].date == _this.choiceDate.date
                && _this.today.nowMonth == _this.choiceDate.month
                && _this.today.nowYear == _this.choiceDate.year) {
                item.classList.add('active');
                // 存储dom样式
                _this.currectChoiceDom = item;
            }

            // 数据上有当前日期和现在日期相等 那存储数据

            if (showMonth[i].date == _this.today.day()) {
                this.todayDom = item;
            }
            // 点击每一个日期
            item.addEventListener('click', function () {
                if (_this.currectChoiceDom != null) {
                    _this.currectChoiceDom.classList.remove('active');
                    _this.choiceDate = {};
                }
                // 点击的日期的年份
                var this_year = Number(this.getAttribute('data-year'));
                // 点击的日期的月份
                var this_month = Number(this.getAttribute('data-month'));
                // 获取具体日期
                var val = this.innerHTML;
                // 设置输入框的值
                _this.input.value = this_year + '-' + _this.addZero(this_month) + '-' + _this.addZero(val);
                // 更新choiceDate.date的值
                _this.choiceDate.date = this_year + '-' + _this.addZero(this_month) + '-' + _this.addZero(val);
                _this.choiceDate.month = this_month;
                _this.choiceDate.year = this_year;
                _this.choiceDate.day = _this.addZero(val)
                _this.currectChoiceDom = this;
                this.classList.add('active');
                if (this_month != _this.today.nowMonth) {
                    _this.today.nowMonth = this_month;
                    _this.today.nowYear = this_year;
                    _this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';
                    _this.renderMonthDom(true, _this.choiceDate.day);
                }
            })
            fg.appendChild(item);

        }
        _this.monthDom.innerHTML = '';
        _this.monthDom.appendChild(fg);
        if (self) {
            _this.dom.style.display = 'block';
        }

    }
    // 根据月份获取天数和星期
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    month(fullYear, month) {
        // 获取这个月的天数
        var allDays = new Date(fullYear, month, 0).getDate();
        var weeks = this.weeks;
        var showMonth = [];
        // getDay()返回0~6 0为周天 1为周一 6为周六
        // 获取本月份1号为星期几
        var beforeDays = new Date(fullYear, month - 1, 1).getDay();
        // 为0代表周天 数字为第7为 
        beforeDays = beforeDays == 0 ? 7 : beforeDays;
        // 上个月的天数
        var lastDay = new Date(fullYear, month - 1, 0).getDate();
        // 上个月天数减去数字7 加上 1 代表剩余上个月天数在本月第一个显示位周天的号数
        var beginDay = lastDay - beforeDays + 1;

        // 上个月的几天补充进来
        var prevMonth;
        var prevYear;
        if (month - 1 <= 0) {
            prevMonth = 12;
            prevYear = fullYear - 1;
        } else {
            prevMonth = month - 1;
            prevYear = fullYear;
        }
        for (var i = beginDay; i <= lastDay; i++) {
            showMonth.push({
                year: prevYear,
                month: prevMonth,
                date: prevYear + '-' + prevMonth + '-' + i,
                day: i
            });
        }
        // 这个月的天数
        for (var k = 1; k <= allDays; k++) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var obj = {
                day: k,
                week: weeks[new Date(fullYear, month - 1, k).getDay()]
            }
            showMonth.push({
                year: fullYear,
                month: month,
                date: fullYear + '-' + month + '-' + k,
                day: k
            });
        }
        // 下个月的几天补充进来
        var nextMonth;
        var nextYear;
        if (month + 1 >= 13) {
            nextMonth = 1;
            nextYear = fullYear + 1;
        } else {
            nextMonth = month + 1;
            nextYear = fullYear;
        }
        var over = 7 * 6 - showMonth.length;
        for (var j = 1; j <= over; j++) {
            showMonth.push({
                year: nextYear,
                month: nextMonth,
                date: fullYear + '-' + nextMonth + '-' + j,
                day: j
            });
        }
        return showMonth;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    initBtsDom() {
        var div = 'div';
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var _this = this;
        var now = document.createElement(div); //此刻
        now.classList.add('bt');
        now.innerHTML = '今日';
        now.addEventListener('click', function() {
            _this.today.nowFullYear = new Date().getFullYear() 
           _this.today.nowMonth = new Date().getMonth() + 1 
            _this.renderMonthDom();
            _this.showDateDom.innerHTML = _this.today.nowYear + '年' + _this.addZero(_this.today.nowMonth) + '月';
            if (_this.currectChoiceDom) {
                _this.currectChoiceDom.classList.remove('active');
            }
            _this.currectChoiceDom = _this.todayDom;
            _this.currectChoiceDom.classList.add('active');
            var this_year = Number(_this.todayDom.getAttribute('data-year'));
            var this_month = Number(_this.todayDom.getAttribute('data-month'));
            var val = _this.todayDom.innerHTML;
            _this.input.value = this_year + '-' + _this.addZero(this_month) + '-' + _this.addZero(val);
            _this.choiceDate.date = this_year + '-' + _this.addZero(this_month) + '-' + _this.addZero(val);
            _this.choiceDate.month = this_month;
            _this.choiceDate.year = this_year;
            // _this.isShow = false;
			// 	if (!_this.isShow) {
                console.log(_this.dom)
					_this.dom.style.display = 'none';
				// }
        });
        this.btsDom.appendChild(now);
    }
}

export default DateJs