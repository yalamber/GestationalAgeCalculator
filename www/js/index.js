var currentDate = new Date();
var curretDate_ymd = currentDate.getFullYear()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getDate();
var currentFullYear = currentDate.getFullYear();
var currentFullYearBS = ad2bs(curretDate_ymd).year;
Vue.filter('weeks', function (days) {
    return Math.floor(days / 7)+' Weeks '+ (days % 7) + ' Days';
})
var appVM = new Vue({
    el: '#app',
    data: {
        bs_or_ad: 'BS',
        ad_data: {
            year: currentFullYear,
            years: _.range(currentFullYear-1, currentFullYear+1),
            month: 1,
            months: [
                'January', 
                'February', 
                'March', 
                'April', 
                'May', 
                'June', 
                'July', 
                'August', 
                'September', 
                'October', 
                'November', 
                'December'
            ],
            day:1,
        },
        bs_data: {
            year: currentFullYearBS,
            years: _.range(currentFullYearBS-1, currentFullYearBS+1),
            month: 1,
            months: [
                'Baisakh', 
                'Jeth', 
                'Ashar', 
                'Sharawan', 
                'Bhadra', 
                'Asoj', 
                'kartik', 
                'Mangshir', 
                'Paush', 
                'Magh', 
                'Falgun', 
                'Chaitra'
            ],
            day: 1
        },
        gestationalAge: 0
    },
    computed: {
        ad_data_days: function () {
            var numDays = new Date(this.ad_data.year, this.ad_data.month-1, 0).getDate();
            return _.range(1, numDays+1);   
        },
        bs_data_days: function () {
            var bsCalendar = getBSCalendar();
            var numDays = bsCalendar[this.bs_data.year][this.bs_data.month-1];
            return _.range(1, numDays+1);   
        }
    },
    methods: {
        changeDate: function (bs_or_ad) {
            this.bs_or_ad = 'AD';
            if(bs_or_ad == 'BS') {
                this.bs_or_ad = 'BS';
            }
        },
        calcualteGestationalAge: function () {
            var LMPDate = new Date(this.ad_data.year, this.ad_data.month-1, this.ad_data.day);
            if(this.bs_or_ad == 'BS') {
                var bs_date = this.bs_data.year +'/'+ this.bs_data.month +'/'+ this.bs_data.day;
                var ad_date = bs2ad(bs_date);
                //convert to AD
                LMPDate = new Date(ad_date.year, (ad_date.month-1), ad_date.day);
            }
            //now calculate days in between
            var gestationalAgeInDays = daysBetween(LMPDate, currentDate);
            this.gestationalAge = gestationalAgeInDays;
        },
        calcualteEDD: function () {
            
        }
    }
})