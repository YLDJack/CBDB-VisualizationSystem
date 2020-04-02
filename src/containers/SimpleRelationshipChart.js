import React from 'react';
import axios from 'axios';
import { Row, Col, Card, Radio,Slider } from 'antd';
import echarts from 'echarts';
import  {Link} from  'react-router-dom';
import $ from 'jquery';
import D3SimpleForceChart from "../components/charts/D3SimpleForceChart";

class SimpleRelationshipChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mpName:" ",
            mPerson: {},
            isInput:false,
            isLoaded: false,
            isradio:1,
            maxRelationValue: 6,
            relationValue: 5,
            isChanged: false
        }
        // 将自定义的函数强制绑定为组件对象
        this.handleClick = this.handleClick.bind(this) // 将返回函数中的this强制绑定为指定的对象, 并没有改变原来的函数中的this
        this.handleClick2 = this.handleClick2.bind(this)//显示官员基本信息函数
        this.handleClickSelect = this.handleClickSelect.bind(this)
        this.test = this.test.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({
            relationValue: value,
        })
    }

    handleClick() {
        this.setState({
                mPerson: {},
                mpName:this.msgInput.value,
                isLoaded: false,
                isInput:true},
            () => {
            //这里打印的是最新的state值
                console.log("radio"+this.state.isradio)
                if (this.state.isInput) {
                    if(this.state.isradio == 1){
                        const url = "/person?mpName="+this.state.mpName+"&dataType=1"
                        console.log(url)
                        let count = this.state.maxRelationValue
                        axios.get(url)
                            .then(response => {
                                const result = response.data
                                if(result['err'] == 1)
                                {
                                    alert("数据库没有该历史人物的数据,请重新输入")
                                }
                                else{
                                    for (let i = 0; i < result.assocPersons.length; i++) {
                                        if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                            count = parseInt(result.assocPersons[i].assocCode, 10)
                                        }
                                    }
                                    this.setState({
                                        mPerson:response.data,
                                        isLoaded: true,
                                        maxRelationValue: count
                                    })
                                }
                            })
                            .catch(error => {
                                // debugger
                                alert('对不起！数据库断开连接'+'handleClick()1.1')
                                this.setState({
                                    isInput: false
                                })
                            })
                    }

                    else if(this.state.isradio == 2){
                        const url = "/person?mpName="+this.state.mpName+"&dataType=2"
                        let count = this.state.maxRelationValue
                        console.log(url)
                        axios.get(url)
                            .then(response => {
                                const result = response.data
                                for (let i = 0; i < result.kinPersons.length; i++) {
                                    if (count < parseInt(result.kinPersons[i].kinCode, 10)) {
                                        count = parseInt(result.kinPersons[i].kinCode, 10)
                                    }
                                }
                                if(result['err'] == 1)
                                {
                                    alert("数据库没有该历史人物的数据,请重新输入")
                                }

                                else{
                                    this.setState({
                                        mPerson:response.data,
                                        isLoaded: true,
                                        maxRelationValue: count
                                    })
                                }
                            })
                            .catch(error => {
                                // debugger
                                alert('对不起！数据库断开连接'+'handleClick()1.2')
                                this.setState({
                                    isInput: false
                                })
                            })
                    }

                    else if (this.state.isradio == 3){
                        let result = {}
                        const url_1 = "/person?mpName=" + this.state.mpName + "&dataType=1"
                        const url_2 = "/person?mpName=" + this.state.mpName + "&dataType=2"
                        let count = this.state.maxRelationValue
                        axios.get(url_1)
                            .then(response => {
                                result = response.data
                                if(result['err'] == 1)
                                {
                                    alert("数据库没有该历史人物的数据,请重新输入")
                                }else {
                                    for (let i = 0; i < result.assocPersons.length; i++) {
                                        if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                            count = parseInt(result.assocPersons[i].assocCode, 10)
                                        }
                                    }
                                }
                            })
                            .catch(error => {
                                // debugger
                                console.log(error)
                                alert('对不起！数据库断开连接'+'handleClick()1.3')
                                this.setState({
                                    isInput: false
                                })
                            })
                        setTimeout(() => {
                            axios.get(url_2)
                                .then(response => {
                                    const result_2 = response.data
                                    for (let i = 0; i < result_2.kinPersons.length; i++) {
                                        if (count < parseInt(result_2.kinPersons[i].kinCode, 10)) {
                                            count = parseInt(result_2.kinPersons[i].kinCode, 10)
                                        }
                                    }
                                    $.extend(true, result, result_2)
                                    this.setState({
                                        mPerson: result,
                                        isLoaded: true,
                                        maxRelationValue: count
                                    })
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！数据库断开连接'+'handleClick()1.4')
                                    this.setState({
                                        isInput: false
                                    })
                                })
                        }, 1000)
                    }

                    else {
                        alert("请求失败")
                    }
                }
            });
        alert("您搜索的人物是:"+this.msgInput.value)
    }

    test(e){
        this.setState({isradio:e.target.value});
        if (this.state.mpName!=" "){
            this.setState({
                    mPerson: {},
                    isLoaded: false,
                    isInput:true},
                () => {
                    //这里打印的是最新的state值
                    console.log(this.state.isInput)
                    if (this.state.isInput) {
                        if(this.state.isradio == 1){
                            const url = "/person?mpName="+this.state.mpName+"&dataType=1"
                            console.log(url)
                            let count = this.state.maxRelationValue
                            axios.get(url)
                                .then(response => {
                                    const result = response.data
                                    if(result['err'] == 1)
                                    {
                                        alert("数据库没有该历史人物的数据,请重新输入")
                                    }
                                    else{
                                        for (let i = 0; i < result.assocPersons.length; i++) {
                                            if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                                count = parseInt(result.assocPersons[i].assocCode, 10)
                                            }
                                        }
                                        this.setState({
                                            mPerson:response.data,
                                            isLoaded: true,
                                            maxRelationValue: count
                                        })
                                    }
                                })
                                .catch(error => {
                                    // debugger
                                    alert('对不起！数据库断开连接'+'test()2.1')
                                    this.setState({
                                        isInput: false
                                    })
                                })
                        }

                        else if(this.state.isradio == 2){
                            const url = "/person?mpName="+this.state.mpName+"&dataType=2"
                            let count = this.state.maxRelationValue
                            console.log(url)
                            axios.get(url)
                                .then(response => {
                                    const result = response.data
                                    for (let i = 0; i < result.kinPersons.length; i++) {
                                        if (count < parseInt(result.kinPersons[i].kinCode, 10)) {
                                            count = parseInt(result.kinPersons[i].kinCode, 10)
                                        }
                                    }
                                    if(result['err'] == 1)
                                    {
                                        alert("数据库没有该历史人物的数据,请重新输入")
                                    }

                                    else{
                                        this.setState({
                                            mPerson:response.data,
                                            isLoaded: true,
                                            maxRelationValue: count
                                        })
                                    }
                                })
                                .catch(error => {
                                    // debugger
                                    alert('对不起！数据库断开连接'+'test()2.2')
                                    this.setState({
                                        isInput: false
                                    })
                                })
                        }

                        else if (this.state.isradio == 3){
                            let result = {}
                            const url_1 = "/person?mpName=" + this.state.mpName + "&dataType=1"
                            const url_2 = "/person?mpName=" + this.state.mpName + "&dataType=2"
                            let count = this.state.maxRelationValue
                            axios.get(url_1)
                                .then(response => {
                                    result = response.data
                                    if(result['err'] == 1)
                                    {
                                        alert("数据库没有该历史人物的数据,请重新输入")
                                    }else {
                                        for (let i = 0; i < result.assocPersons.length; i++) {
                                            if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                                count = parseInt(result.assocPersons[i].assocCode, 10)
                                            }
                                        }
                                    }
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！数据库断开连接'+'test()2.3')
                                    this.setState({
                                        isInput: false
                                    })
                                })
                            setTimeout(() => {
                                axios.get(url_2)
                                    .then(response => {
                                        const result_2 = response.data
                                        for (let i = 0; i < result_2.kinPersons.length; i++) {
                                            if (count < parseInt(result_2.kinPersons[i].kinCode, 10)) {
                                                count = parseInt(result_2.kinPersons[i].kinCode, 10)
                                            }
                                        }
                                        $.extend(true, result, result_2)
                                        this.setState({
                                            mPerson: result,
                                            isLoaded: true,
                                            maxRelationValue: count
                                        })
                                    })
                                    .catch(error => {
                                        // debugger
                                        console.log(error)
                                        alert('对不起！数据库断开连接'+'test()2.4')
                                        this.setState({
                                            isInput: false
                                        })
                                    })
                            }, 1000)
                        }
                        else {
                            alert("请求失败")
                        }
                    }
                });
        }
    }

    handleClick2(e){
        var index = e.target.value;
        let name = this.state.mpName;
        if (index == 'a'){
            const address  = "/person?mpName="+name+"&dataType=3" //任职信息

            $.ajax({
                type: "get",
                dataType : "json",//数据格式
                url: address,  //请求地址

                success: function(msg){

                    if(msg['err'] == 1 || !msg['postPersons'])
                    {
                        console.log("数据库没有该历史人物的任职数据,请重新输入")
                        $("#info1  tr:not(:first)").empty("");
                        $("#head2").html("");
                        $("#head2").html(name+"任职信息");
                        $('#info1 tr:eq(0) th:eq(1)').html("姓名")//更换表头
                        $('#info1 tr:eq(0) th:eq(2)').html("就职地")//更换表头
                        $('#info1 tr:eq(0) th:eq(3)').html("出生地")//更换表头
                        $('#info1 tr:eq(0) th:eq(4)').html("官职名")//更换表头

                        var tr="";
                        tr= '<td>'+'无数据'+'</td>' +
                            '<td>'+'无数据'+'</td>' +
                            '<td>'+'无数据'+'</td>' +
                            '<td>'+'无数据'+'</td>' +
                            '<td>'+'无数据'+'</td>';
                        $("#info1").append('<tr>'+tr+'</tr>')
                    }

                    else{
                        $("#info1  tr:not(:first)").empty("");
                        $("#head2").html("");
                        $("#head2").html(name+"任职信息");
                        $('#info1 tr:eq(0) th:eq(1)').html("上任时间")//更换表头
                        $('#info1 tr:eq(0) th:eq(2)').html("调任时间")//更换表头
                        $('#info1 tr:eq(0) th:eq(3)').html("官职名")//更换表头
                        $('#info1 tr:eq(0) th:eq(4)').html("任官地点")//更换表头

                        var msg1 = msg['postPersons'];

                        for(var i=0 ;i <msg1.length;i++){
                            var tr="";
                            var n=i+1;
                            var addressName = msg1[i]['addressName'];
                            tr='<td>'+n+'</td>' +
                                /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                                '<td>'+msg1[i]['firstYear']+'</td>' +
                                '<td>'+msg1[i]['lastYear']+'</td>' +
                                '<td>'+msg1[i]['officeName']+'</td>' +
                                /*'<td  id="m1" href="http://localhost:3000/#/simple-force-chart?name="+name>'+msg1[i]['addressName']+'</td>';*/
                                '<td>'+msg1[i]['addressName']+'</td>';
                            $("#info1").append('<tr>'+tr+'</tr>')
                        }
                    }
                },
                error:function(msg){
                    alert('对不起！数据库断开连接'+'handleClick2(e)3.1');
                }
            })

        }
        else if (index == 'b'){  //同年信息
            var year = $("#id4").html();
            if(year == '无数据'){
                $("#info1  tr:not(:first)").empty("");
                $("#head2").html("");
                $("#head2").html(name+"同年当官历史人物");
                $('#info1 tr:eq(0) th:eq(1)').html("姓名")//更换表头
                $('#info1 tr:eq(0) th:eq(2)').html("就职地")//更换表头
                $('#info1 tr:eq(0) th:eq(3)').html("出生地")//更换表头
                $('#info1 tr:eq(0) th:eq(4)').html("官职名")//更换表头

                var tr="";
                tr= '<td>'+'无数据'+'</td>' +
                    '<td>'+'无数据'+'</td>' +
                    '<td>'+'无数据'+'</td>' +
                    '<td>'+'无数据'+'</td>' +
                    '<td>'+'无数据'+'</td>';
                $("#info1").append('<tr>'+tr+'</tr>')
            }
            else{
                var arr = year.split(":");
                var arr1 = arr[1].split("(");
                var address = "/address?firstYear=" + arr1[0];

                $.ajax({
                    type: "get",
                    dataType : "json",//数据格式
                    url: address,  //请求地址

                    success: function(msg) {
                        $("#info1  tr:not(:first)").empty("");
                        $("#head2").html("");
                        $("#head2").html(name+"同年当官历史人物");
                        $('#info1 tr:eq(0) th:eq(1)').html("姓名")//更换表头
                        $('#info1 tr:eq(0) th:eq(2)').html("就职地")//更换表头
                        $('#info1 tr:eq(0) th:eq(3)').html("出生地")//更换表头
                        $('#info1 tr:eq(0) th:eq(4)').html("官职名")//更换表头

                        for(var i=0 ;i <msg.length;i++){
                            var tr="";
                            var n=i+1;

                            tr= '<td>'+n+'</td>' +
                                /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                                '<td>'+msg[i]['chName']+'</td>' +
                                '<td>'+msg[i]['office_address()']+'</td>' +
                                '<td>'+msg[i]['city']+'</td>' +
                                '<td>'+msg[i]['office_name']+'</td>';
                            $("#info1").append('<tr>'+tr+'</tr>')
                        }
                    },
                    error:function(msg){
                        alert('对不起！数据库断开连接'+'handleClick2(e)3.2');
                    }
                })
            }
        }

        else{
            console.log("handleClick2:error")
        }
    }

    nameHandler(name){
        this.setState({mpName: name })

        if (this.state.mpName!=" "){
            this.setState({
                    mPerson: {},
                    isLoaded: false,
                    isInput:true},
                () => {
                    //这里打印的是最新的state值
                    console.log(this.state.isInput)
                    if (this.state.isInput) {
                        if(this.state.isradio == 1) {
                            const url = "/person?mpName=" + this.state.mpName + "&dataType=1"
                            console.log(url)
                            let count = this.state.maxRelationValue
                            setTimeout(() => {
                                axios.get(url)
                                    .then(response => {
                                        const result = response.data
                                        if (result['err'] == 1) {
                                            alert("数据库没有该历史人物的数据,请重新输入")
                                        } else {
                                            for (let i = 0; i < result.assocPersons.length; i++) {
                                                if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                                    count = parseInt(result.assocPersons[i].assocCode, 10)
                                                }
                                            }
                                            this.setState({
                                                mPerson: response.data,
                                                isLoaded: true,
                                                maxRelationValue: count
                                            })
                                        }
                                    })
                                    .catch(error => {
                                        // debugger
                                        alert('对不起！数据库断开连接' + 'nameHandler(name)4.1')
                                        this.setState({
                                            isInput: false
                                        })
                                    })
                            }, 1000)
                        }

                        else if(this.state.isradio == 2) {
                            const url = "/person?mpName=" + this.state.mpName + "&dataType=2"
                            let count = this.state.maxRelationValue
                            console.log(url)
                            setTimeout(() => {
                                axios.get(url)
                                    .then(response => {
                                        const result = response.data
                                        for (let i = 0; i < result.kinPersons.length; i++) {
                                            if (count < parseInt(result.kinPersons[i].kinCode, 10)) {
                                                count = parseInt(result.kinPersons[i].kinCode, 10)
                                            }
                                        }
                                        if (result['err'] == 1) {
                                            alert("数据库没有该历史人物的数据,请重新输入")
                                        } else {
                                            this.setState({
                                                mPerson: response.data,
                                                isLoaded: true,
                                                maxRelationValue: count
                                            })
                                        }
                                    })
                                    .catch(error => {
                                        // debugger
                                        alert('对不起！数据库断开连接' + 'nameHandler(name)4.2')
                                        this.setState({
                                            isInput: false
                                        })
                                    })
                            }, 1000)
                        }

                        else if (this.state.isradio == 3){
                            let result = {}
                            const url_1 = "/person?mpName=" + this.state.mpName + "&dataType=1"
                            const url_2 = "/person?mpName=" + this.state.mpName + "&dataType=2"
                            let count = this.state.maxRelationValue
                            axios.get(url_1)
                                .then(response => {
                                    result = response.data
                                    if(result['err'] == 1)
                                    {
                                        alert("数据库没有该历史人物的数据,请重新输入")
                                    }else {
                                        for (let i = 0; i < result.assocPersons.length; i++) {
                                            if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                                count = parseInt(result.assocPersons[i].assocCode, 10)
                                            }
                                        }
                                    }
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！数据库断开连接' + 'nameHandler(name)4.3')
                                    this.setState({
                                        isInput: false
                                    })
                                })
                            setTimeout(() => {
                                axios.get(url_2)
                                    .then(response => {
                                        const result_2 = response.data
                                        for (let i = 0; i < result_2.kinPersons.length; i++) {
                                            if (count < parseInt(result_2.kinPersons[i].kinCode, 10)) {
                                                count = parseInt(result_2.kinPersons[i].kinCode, 10)
                                            }
                                        }
                                        $.extend(true, result, result_2)
                                        this.setState({
                                            mPerson: result,
                                            isLoaded: true,
                                            maxRelationValue: count
                                        })
                                    })
                                    .catch(error => {
                                        // debugger
                                        console.log(error)
                                        alert('对不起！数据库断开连接' + 'nameHandler(name)4.4')
                                        this.setState({
                                            isInput: false
                                        })
                                    })
                            }, 1000)
                        }
                        else {
                            alert("请求失败")
                        }
                    }
                });
        }
    }

    componentDidMount() {
        var _this = this;
        $.ajax({url: "/map?dynasty_flag=1",type:'GET',dataType:'json',success: function(data1){
                $.ajax({url: "/map?dynasty_flag=2",type:'GET',dataType:'json',success: function(data2){
                        $.ajax({url: "/map?dynasty_flag=3",type:'GET',dataType:'json',success: function(data3){
                                $.ajax({url: "/map?dynasty_flag=4",type:'GET',dataType:'json',success: function(data4){
                                        $.ajax({url: "/map?dynasty_flag=5",type:'GET',dataType:'json',success: function(data5) {
                                                var  mapData1,mapData2,mapData3,mapData4,mapData5;
                                                var convertData = (nb)=> {
                                                    var res = [];
                                                    var dataObject = nb;
                                                    for (var i = 0; i < dataObject.length; i++) {
                                                        var concatArray = [];
                                                        concatArray.push(dataObject[i]["coord"][0]);
                                                        concatArray.push(dataObject[i]["coord"][1]);
                                                        concatArray.push(dataObject[i]["coord"][2]);
                                                        res.push({
                                                            name: "coord",
                                                            value: concatArray
                                                        });
                                                    }
                                                    return res;
                                                }
                                                mapData1 = convertData(data1);
                                                mapData2 = convertData(data2);
                                                mapData3 = convertData(data3);
                                                mapData4 = convertData(data4);
                                                mapData5 = convertData(data5);
                                                var address;
                                                var myChart = echarts.init(document.getElementById('main'));
                                                var myChart2 = echarts.init(document.getElementById('main2'));
                                                myChart.showLoading();   //加载动画
                                                myChart2.showLoading();   //加载动画

                                                myChart.hideLoading();  //动画消失
                                                myChart2.hideLoading();  //动画消失

                                                $.get("Tang.json", function (geoJson) {
                                                    echarts.registerMap('tang', geoJson);  //注册地图
                                                });

                                                $.get("Song.geojson", function (geoJson) {
                                                    echarts.registerMap('song', geoJson);  //注册地图
                                                });

                                                $.get("Yuan.geojson", function (geoJson) {
                                                    echarts.registerMap('yuan', geoJson);  //注册地图
                                                });

                                                $.get("Ming.geojson", function (geoJson) {
                                                    echarts.registerMap('ming', geoJson);  //注册地图
                                                });

                                                $.get("Qing.geojson", function (geoJson) {
                                                    echarts.registerMap('qing', geoJson);  //注册地图
                                                });

                                                //==========================第二个图表===============================//

                                                var timeData = ['唐初','670年','720','770年','820年','870年','唐末',                       //618-622 668-672 718-722 768-772  818-822 868-872 903-907
                                                    '宋初','1010年','1060年','1110年','1160年','1210年','宋末',                //960-964 1010-1014 1060-1064 1110-1114 1160-1164 1210-1214 1275-1279
                                                    '元初','1300年','1330年','元末',                                           //1271-1275 1300-1304 1330-1334 1364-1368
                                                    '明初','1418年','1468年','1518年','1568年','1618年','明末',                //1368-1372 1418-1422 1468-1472 1518-1522 1568-1572 1618-1622 1640-1644
                                                    '清初','1690年','1740年','1790年','1840年','清末']  //x坐标                // 1636-1640 1690-1694 1740-1744 1790-1794 1840-1844 1908-1912
                                                var option2 = {
                                                    xAxis: {
                                                        data: timeData,
                                                    },
                                                    yAxis: {
                                                        name : '数量(个)',
                                                        type: 'value'
                                                    },
                                                    tooltip : {
                                                        trigger: 'axis',  //当trigger为’item’时只会显示该点的数据，为’axis’时显示该列下所有坐标轴所对应的数据.
                                                        axisPointer: {
                                                            type: 'shadow',  //阴影式浮层
                                                            label: {
                                                                backgroundColor: '#6a7985'
                                                            }
                                                        },
                                                        formatter: '人数:'+'{c0}'
                                                    },

                                                    dataZoom: [// 这个dataZoom组件，若未设置xAxisIndex或yAxisIndex，则默认控制x轴。
                                                        {
                                                            type: 'slider',//这个 dataZoom 组件是 slider 型 dataZoom 组件（只能拖动 dataZoom 组件导致窗口变化）
                                                            xAxisIndex: 0, //控制x轴
                                                            /*start: 10, 	// 左边在 10% 的位置
                                                            end: 60 	// 右边在 60% 的位置*/
                                                        },
                                                        /* {
                                                             type: 'inside',//这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
                                                             xAxisIndex: 0,//控制x轴
                                                             start: 10,
                                                             end: 60
                                                         },*/
                                                    ],
                                                    series: [
                                                        {
                                                            name: 'scatter',
                                                            type: 'line',
                                                            itemStyle: {
                                                                normal: {
                                                                    opacity: 0.8
                                                                }
                                                            },
                                                            data: [ 61,96,137,158,190,157,96,
                                                                40,54,114,113,154,128,151,
                                                                107,87,67,69,
                                                                62,56,337,467,814,445,333,
                                                                244,220,159,197,217,244 ]
                                                        }
                                                    ]
                                                };
                                                myChart2.setOption(option2);

                                                //==========================第一个图表===============================//
                                                var option = {
                                                    baseOption: {
                                                        timeline: {
                                                            // y: 0,
                                                            axisType: 'category',
                                                            // realtime: false,
                                                            loop: false,
                                                            data: ['唐','宋', '元', '明', '清'],
                                                            autoPlay: false,
                                                            playInterval: 1000,//循坏的时间
                                                        },
                                                    },

                                                    options: [
                                                        {
                                                            title: {text: '唐代（714年）地图'},
                                                            geo: {
                                                                map: 'tang',
                                                                label: {
                                                                    emphasis: {
                                                                        show: true,
                                                                        color: '#666666',   //文字颜色
                                                                        fontFamily: 'monospace'
                                                                    }
                                                                },
                                                                /*
                                                                roam: true,
                                                                zoom: 1.5,
                                                                zlevel: 0,*/
                                                                center: [113.97, 36],
                                                                itemStyle: {
                                                                    normal: {
                                                                        areaColor: '#efefef',
                                                                        borderColor: '#e1e1e1'
                                                                    },
                                                                    emphasis: {
                                                                        areaColor: '#cbcbcb',
                                                                    }
                                                                }
                                                            },
                                                            visualMap: { //用于开启自定义的视觉颜色条框
                                                                show: true,
                                                                min: 0,
                                                                max: 200,
                                                                calculable: true,//如果开启，将会支持手动拖拽更改颜色
                                                                inRange: {
                                                                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                                                                },
                                                                top: 20
                                                            },
                                                            series: [{
                                                                name:"官员分布密度",
                                                                type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
                                                                coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
                                                                data:mapData1,
                                                                pointSize: 4,//显示点的大小
                                                                blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#ddb926'
                                                                    }
                                                                }
                                                            }]

                                                        },

                                                        {
                                                            title: { text:'宋朝（993年）地图'},
                                                            geo: {
                                                                map: 'song',
                                                                label: {
                                                                    emphasis: {
                                                                        show: true,
                                                                        color:'#666666',  //文字颜色
                                                                        fontFamily:'monospace'
                                                                    }
                                                                },

                                                                center: [113.97, 28],
                                                                itemStyle: {
                                                                    normal: {
                                                                        areaColor: '#efefef',
                                                                        borderColor: '#e1e1e1'
                                                                    },
                                                                    emphasis: {
                                                                        areaColor: '#cbcbcb',
                                                                    }
                                                                }
                                                            },
                                                            visualMap: { //用于开启自定义的视觉颜色条框
                                                                show: true,
                                                                min: 0,
                                                                max: 200,
                                                                calculable: true,//如果开启，将会支持手动拖拽更改颜色
                                                                inRange: {
                                                                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                                                                },
                                                                top: 20
                                                            },
                                                            series: [{
                                                                name:"官员分布密度",
                                                                type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
                                                                coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
                                                                data:mapData2,
                                                                pointSize: 10,//显示点的大小
                                                                blurSize: 11, //模糊显示点  其放大倍数越高，显示点的颜色越浅
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#ddb926'
                                                                    }
                                                                }
                                                            }]
                                                        },

                                                        {

                                                            title: { text:'元朝顺元年（1330年）地图'},
                                                            geo: {
                                                                map: 'yuan',
                                                                label: {
                                                                    emphasis: {
                                                                        show: true,
                                                                        color: '#666666',  //文字颜色
                                                                        fontFamily: 'monospace'
                                                                    }
                                                                },

                                                                center: [105, 36],  //x越大越左
                                                                itemStyle: {
                                                                    normal: {
                                                                        areaColor: '#efefef',
                                                                        borderColor: '#e1e1e1'
                                                                    },
                                                                    emphasis: {
                                                                        areaColor: '#cbcbcb',
                                                                    }
                                                                }
                                                            },
                                                            visualMap: { //用于开启自定义的视觉颜色条框
                                                                show: true,
                                                                min: 0,
                                                                max: 200,
                                                                calculable: true,//如果开启，将会支持手动拖拽更改颜色
                                                                inRange: {
                                                                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                                                                },
                                                                top: 20
                                                            },
                                                            series: [{
                                                                name:"官员分布密度",
                                                                type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
                                                                coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
                                                                data:mapData3,
                                                                pointSize: 4,//显示点的大小
                                                                blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#ddb926'
                                                                    }
                                                                }
                                                            }]
                                                        },

                                                        {

                                                            title: { text:'明朝（1402-1424年）地图'},
                                                            geo: {
                                                                map: 'ming',
                                                                label: {
                                                                    emphasis: {
                                                                        show: true,
                                                                        color: '#666666',  //文字颜色
                                                                        fontFamily: 'monospace'
                                                                    }
                                                                },


                                                                center: [110, 33],
                                                                itemStyle: {
                                                                    normal: {
                                                                        areaColor: '#efefef',
                                                                        borderColor: '#e1e1e1'
                                                                    },
                                                                    emphasis: {
                                                                        areaColor: '#cbcbcb',
                                                                    }
                                                                }
                                                            },
                                                            visualMap: { //用于开启自定义的视觉颜色条框
                                                                show: true,
                                                                min: 0,
                                                                max: 200,
                                                                calculable: true,//如果开启，将会支持手动拖拽更改颜色
                                                                inRange: {
                                                                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                                                                },
                                                                top: 20
                                                            },
                                                            series: [{
                                                                name:"官员分布密度",
                                                                type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
                                                                coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
                                                                data:mapData4,
                                                                pointSize: 4,//显示点的大小
                                                                blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#ddb926'
                                                                    }
                                                                }
                                                            }]
                                                        },

                                                        {
                                                            title: {text: '清朝（1820年）地图'},
                                                            geo: {
                                                                map: 'qing',
                                                                label: {
                                                                    emphasis: {
                                                                        show: true,
                                                                        color:'#666666',  //文字颜色
                                                                        fontFamily:'monospace'
                                                                    }
                                                                },

                                                                center: [108,36],  //h越大越低
                                                                itemStyle: {
                                                                    normal: {
                                                                        areaColor: '#efefef',
                                                                        borderColor: '#e1e1e1'
                                                                    },
                                                                    emphasis: {
                                                                        areaColor: '#cbcbcb',
                                                                    }
                                                                }
                                                            },
                                                            visualMap: { //用于开启自定义的视觉颜色条框
                                                                show: true,
                                                                min: 0,
                                                                max: 200,
                                                                calculable: true,//如果开启，将会支持手动拖拽更改颜色
                                                                inRange: {
                                                                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                                                                },
                                                                top: 20
                                                            },
                                                            series: [{
                                                                name:"官员分布密度",
                                                                type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
                                                                coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
                                                                data:mapData5,
                                                                pointSize: 4,//显示点的大小
                                                                blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
                                                                itemStyle: {
                                                                    normal: {
                                                                        color: '#ddb926'
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    ]
                                                };
                                                myChart.setOption(option);


                                                //地图点击事件
                                                myChart.on('click', function (params) {
                                                    if(params.name == '江南東道' || params.name == '關內道' || params.name == '河東道' || params.name == '都畿道' || params.name == '河北道' || params.name == '河南道'
                                                        || params.name =='嶺南道' || params.name == '黔中道' || params.name == '劍南道' || params.name == '隴右道' || params.name == '山南西道' || params.name == '山南東道'
                                                        || params.name == '江南西道' || params.name == '淮南道' || params.name =='京畿道') {
                                                        address = "/address?addressName_tang="+params.name;
                                                    }

                                                    else if(params.name == '成都府路' || params.name == '福建路' || params.name == '廣南東路' || params.name == '廣南西路' || params.name == '河北東路' || params.name == '河北西路'
                                                        || params.name == '河東路' || params.name == '淮南東路' || params.name == '淮南西路' || params.name == '京東東路' || params.name =='京東西路' || params.name == '荊湖北路'
                                                        || params.name == '荊湖南路' || params.name == '京畿路' || params.name == '江南東路' || params.name == '江南西路' || params.name == '京西北路' || params.name == '京西南路'
                                                        || params.name == '夔州路' || params.name == '利州路' || params.name == '兩浙路' || params.name == '秦鳳路' || params.name == '永興軍路' || params.name == '梓州路'){
                                                        address = "/address?addressName_song="+params.name;
                                                    }

                                                    else if(params.name == '瓊州' ||params.name == '琉球' ||params.name == '湖广行中書省' ||params.name == '河南江北行中書省' ||params.name == '宣政院轄地' ||params.name == '遼陽行中書省'
                                                        ||params.name == '江西行中書省' || params.name =='四川行中書省' || params.name =='雲南行中書省' || params.name =='山西行中書省' || params.name =='甘肅行中書省'
                                                        || params.name == '察合台漢國' || params.name =='嶺北行中書省' || params.name =='中書省' || params.name =='江浙行中書省'){
                                                        address = "/address?addressName_yuan="+params.name;
                                                    }

                                                    else if(params.name == '貴州布政司' || params.name == '山東布政司' || params.name == '江西布政司' || params.name == '河南布政司' || params.name == '遼寧布政司'
                                                        || params.name == '山西布政司' || params.name == '安徽布政司' || params.name == '福建布政司' || params.name == '浙江布政司' || params.name == '江蘇布政司'
                                                        || params.name == '海南布政司' || params.name == '台灣布政司' || params.name == '京師布政司' || params.name == '廣東布政司' || params.name == '奴兒干都司'
                                                        || params.name == '陝西布政司' || params.name == '湖廣布政司' || params.name == '交險布政司' || params.name == '乌丝藏独丝' || params.name == '四川布政司'
                                                        || params.name == '雲南布政司' ){
                                                        address = "/address?addressName_ming="+params.name;
                                                    }

                                                    else if(params.name == '新疆省' || params.name == '西藏省' || params.name == '青海省' || params.name == '雲南省' || params.name == '廣西省' || params.name == '湖南省'
                                                        || params.name == '陝西省' || params.name == '湖北省' || params.name == '貴州' || params.name == '山東省' || params.name == '江西省' || params.name == '河南省'
                                                        || params.name == '遼寧省' || params.name == '山西省' || params.name == '安徽省' || params.name == '福建省' || params.name == '浙江省' || params.name == '江蘇省'
                                                        || params.name == '海南省' || params.name == '台灣省' || params.name == '烏里雅蘇臺' || params.name == '京师' || params.name == '甘肅省' || params.name == '內蒙古省'
                                                        || params.name == '吉林省' || params.name == '庫頁島' || params.name == '黑龍江省' || params.name == '四川省' || params.name == '廣東省'){
                                                        address = "/address?addressName_qing="+params.name;
                                                    }
                                                    else{
                                                        address = "null"
                                                    }
                                                    console.log("11"+address);


                                                    $("#select1").val(0);//设置每次点击地图后都是默认<请选择>选项
                                                    $("#select2").val(4);//设置每次点击地图后都是默认<请选择>选项

                                                    if(address =="null")
                                                    {
                                                        $("#info  tr:not(:first)").empty("");
                                                        $("#head").html("");
                                                        $("#head").html(params.name+"信息");  //标题对应鼠标滑过的道名

                                                        var tr = '<td>'+'无数据'+'</td>' +
                                                            '<td>'+'无数据'+'</td>' +
                                                            '<td>'+'无数据'+'</td>' +
                                                            '<td>'+'无数据'+'</td>' +
                                                            '<td>'+'无数据'+'</td>' +
                                                            '<td>'+'无数据'+'</td>' ;
                                                        $("#info").append('<tr>'+tr+'</tr>')
                                                    }
                                                    else{
                                                        $.ajax({
                                                            type: "get",
                                                            dataType : "json",//数据格式
                                                            url: address,  //请求地址
                                                            //http://120.78.126.252/CBDB/address?addressName=江南東道

                                                            success: function(msg){
                                                                if(msg.length == 0){                               /*无数据的情况下*/
                                                                    $("#info  tr:not(:first)").empty("");
                                                                    $("#head").html("");
                                                                    $("#head").html(params.name+"信息");  //标题对应鼠标滑过的道名

                                                                    var tr = '<td>'+'无数据'+'</td>' +
                                                                        '<td>'+'无数据'+'</td>' +
                                                                        '<td>'+'无数据'+'</td>' +
                                                                        '<td>'+'无数据'+'</td>' +
                                                                        '<td>'+'无数据'+'</td>' +
                                                                        '<td>'+'无数据'+'</td>' ;
                                                                    $("#info").append('<tr>'+tr+'</tr>')
                                                                }
                                                                else{
                                                                    $("#info  tr:not(:first)").empty("");
                                                                    $("#head").html("");
                                                                    $("#head").html(params.name+"信息");  //标题对应鼠标滑过的道名

                                                                    for(var i = 0 ;i < msg.length;i++){  //有数据返回的情况下
                                                                        var tr="";
                                                                        var n=i+1;
                                                                        tr='<td>'+n+'</td>' +
                                                                            '<td name = "chName"  style="text-decoration:underline;cursor:pointer;color: dodgerblue" alt="查询详情" title="查询详情">'+msg[i]['chName']+'</td>' +
                                                                            '<td>'+msg[i]['office_name']+'</td>' +
                                                                            '<td>'+msg[i]['city']+'</td>' +
                                                                            '<td>'+msg[i]['firstyear']+'</td>' +
                                                                            '<td>'+msg[i]['lastyear']+'</td>' ;
                                                                        $("#info").append('<tr>'+tr+'</tr>');
                                                                    }
                                                                }
                                                            },

                                                            error:function(msg){

                                                            }
                                                        })
                                                    }

                                                });

                                                myChart.on('timelinechanged',function (params) {
                                                    var index = params.currentIndex;

                                                    $("#info  tr:not(:first)").empty("");  //清空表

                                                    if(index == 0){   //唐
                                                        myChart2.dispatchAction({
                                                            type: 'dataZoom',
                                                            /* dataZoomIndex: number,      // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0*/
                                                            start: 0,              // 开始位置的百分比，0 - 100
                                                            end: 20,                // 结束位置的百分比，0 - 100
                                                            /*startValue: 96,        // 开始位置的数值
                                                            endValue: 65           // 结束位置的数值*/
                                                        });
                                                    }

                                                    else if (index == 1){  //宋
                                                        myChart2.dispatchAction({
                                                            type: 'dataZoom',
                                                            start: 23,              // 开始位置的百分比，0 - 100
                                                            end: 43,                // 结束位置的百分比，0 - 100
                                                        });
                                                    }
                                                    else if (index == 2){   //元
                                                        myChart2.dispatchAction({
                                                            type: 'dataZoom',
                                                            start: 45,              // 开始位置的百分比，0 - 100
                                                            end: 55,                // 结束位置的百分比，0 - 100
                                                        });
                                                    }
                                                    else if (index == 3){   //明
                                                        myChart2.dispatchAction({
                                                            type: 'dataZoom',
                                                            start: 60,              // 开始位置的百分比，0 - 100
                                                            end: 80,                // 结束位置的百分比，0 - 100
                                                        });
                                                    }
                                                    else {  //清
                                                        myChart2.dispatchAction({
                                                            type: 'dataZoom',
                                                            start: 83,              // 开始位置的百分比，0 - 100
                                                            end: 100,                // 结束位置的百分比，0 - 100
                                                        });
                                                    }
                                                })

                                                $("#info").on("click","td[name=chName]",function(){
                                                    var chName = $(this).html();
                                                    _this.setState({mpName: chName })

                                                    if (_this.state.mpName!=" "){
                                                        _this.setState({
                                                                mPerson: {},
                                                                isLoaded: false,
                                                                isInput:true},
                                                            () => {
                                                                //这里打印的是最新的state值
                                                                console.log(_this.state.isInput)
                                                                if (_this.state.isInput) {
                                                                    if(_this.state.isradio == 1){
                                                                        const url = "/person?mpName="+chName+"&dataType=1"
                                                                        console.log(url)
                                                                        axios.get(url)
                                                                            .then(response => {
                                                                                const result = response.data
                                                                                if(result['err'] == 1)
                                                                                {
                                                                                    alert("数据库没有该历史人物的数据,请重新输入")
                                                                                }

                                                                                else{
                                                                                    _this.setState({
                                                                                        mPerson:response.data,
                                                                                        isLoaded: true
                                                                                    })
                                                                                }
                                                                            })
                                                                            .catch(error => {
                                                                                // debugger
                                                                                alert('对不起！数据库断开连接' + 'componentDidMount5.1')
                                                                                _this.setState({
                                                                                    isInput: false
                                                                                })
                                                                            })
                                                                    }

                                                                    else if(_this.state.isradio == 2){
                                                                        const url = "/person?mpName="+chName+"&dataType=2"
                                                                        console.log(url)
                                                                        axios.get(url)
                                                                            .then(response => {
                                                                                const result = response.data
                                                                                if(result['err'] == 1)
                                                                                {
                                                                                    alert("数据库没有该历史人物的数据,请重新输入")
                                                                                }

                                                                                else{
                                                                                    _this.setState({
                                                                                        mPerson:response.data,
                                                                                        isLoaded: true
                                                                                    })
                                                                                }
                                                                            })
                                                                            .catch(error => {
                                                                                // debugger
                                                                                alert('对不起！数据库断开连接' + 'componentDidMount5.2')
                                                                                _this.setState({
                                                                                    isInput: false
                                                                                })
                                                                            })
                                                                    }
                                                                    else {
                                                                        alert("请求失败")
                                                                    }
                                                                }
                                                            });
                                                    }
                                                })

                                                //筛选事件
                                                var select = document.getElementById("select1");
                                                select.onchange=function(params){
                                                    var selvalue = select.value;
                                                    var val = document.getElementById("select2");
                                                    var option;
                                                    console.log("debug"+ params.name)
                                                    /*$("#select2").val(0);*/

                                                    if(params.name == '江南東道' || params.name == '關內道' || params.name == '河東道' || params.name == '都畿道' || params.name == '河北道' || params.name == '河南道'
                                                        || params.name =='嶺南道' || params.name == '黔中道' || params.name == '劍南道' || params.name == '隴右道' || params.name == '山南西道' || params.name == '山南東道'
                                                        || params.name == '江南西道' || params.name == '淮南道' || params.name =='京畿道') {
                                                        address = "/address?addressName_tang="+params.name;
                                                    }

                                                    else if(params.name == '成都府路' || params.name == '福建路' || params.name == '廣南東路' || params.name == '廣南西路' || params.name == '河北東路' || params.name == '河北西路'
                                                        || params.name == '河東路' || params.name == '淮南東路' || params.name == '淮南西路' || params.name == '京東東路' || params.name =='京東西路' || params.name == '荊湖北路'
                                                        || params.name == '荊湖南路' || params.name == '京畿路' || params.name == '江南東路' || params.name == '江南西路' || params.name == '京西北路' || params.name == '京西南路'
                                                        || params.name == '夔州路' || params.name == '利州路' || params.name == '兩浙路' || params.name == '秦鳳路' || params.name == '永興軍路' || params.name == '梓州路'){
                                                        address = "/address?addressName_song="+params.name;
                                                    }

                                                    else if(params.name == '瓊州' ||params.name == '琉球' ||params.name == '湖广行中書省' ||params.name == '河南江北行中書省' ||params.name == '宣政院轄地' ||params.name == '遼陽行中書省'
                                                        ||params.name == '江西行中書省' || params.name =='四川行中書省' || params.name =='雲南行中書省' || params.name =='山西行中書省' || params.name =='甘肅行中書省'
                                                        || params.name == '察合台漢國' || params.name =='嶺北行中書省' || params.name =='中書省' || params.name =='江浙行中書省'){
                                                        address = "/address?addressName_yuan="+params.name;
                                                    }

                                                    else if(params.name == '貴州布政司' || params.name == '山東布政司' || params.name == '江西布政司' || params.name == '河南布政司' || params.name == '遼寧布政司'
                                                        || params.name == '山西布政司' || params.name == '安徽布政司' || params.name == '福建布政司' || params.name == '浙江布政司' || params.name == '江蘇布政司'
                                                        || params.name == '海南布政司' || params.name == '台灣布政司' || params.name == '京師布政司' || params.name == '廣東布政司' || params.name == '奴兒干都司'
                                                        || params.name == '陝西布政司' || params.name == '湖廣布政司' || params.name == '交險布政司' || params.name == '乌丝藏独丝' || params.name == '四川布政司'
                                                        || params.name == '雲南布政司' ){
                                                        address = "/address?addressName_ming="+params.name;
                                                    }

                                                    else if(params.name == '新疆省' || params.name == '西藏省' || params.name == '青海省' || params.name == '雲南省' || params.name == '廣西省' || params.name == '湖南省'
                                                        || params.name == '陝西省' || params.name == '湖北省' || params.name == '貴州' || params.name == '山東省' || params.name == '江西省' || params.name == '河南省'
                                                        || params.name == '遼寧省' || params.name == '山西省' || params.name == '安徽省' || params.name == '福建省' || params.name == '浙江省' || params.name == '江蘇省'
                                                        || params.name == '海南省' || params.name == '台灣省' || params.name == '烏里雅蘇臺' || params.name == '京师' || params.name == '甘肅省' || params.name == '內蒙古省'
                                                        || params.name == '吉林省' || params.name == '庫頁島' || params.name == '黑龍江省' || params.name == '四川省' || params.name == '廣東省'){
                                                        address = "/address?addressName_qing="+params.name;
                                                    }
                                                    console.log( " 3333333333333333333333"+ address);


                                                    $.ajax({
                                                        type: "get",
                                                        dataType: "json",//数据格式
                                                        url: address,  //请求地址

                                                        success: function(msg) {

                                                            if(selvalue == 1){       //选择了官职名
                                                                for(var i=0;i<msg.length;i++){
                                                                    console.log("选择了官职名");
                                                                    option += "<option value='" + msg[i]['id'] + "'>" + msg[i]['office_name'] + "</option>";

                                                                }
                                                                $("#select2").html(option);//将循环拼接的字符串插入第二个下拉列表

                                                                $("select option").each(function() {    //删除重复数据
                                                                    var text = $(this).text();
                                                                    if($("select option:contains("+text+")").length > 1)
                                                                        $("select option:contains("+text+"):gt(0)").remove();
                                                                });
                                                                console.log('删除重复数据');
                                                            }

                                                            if(selvalue ==2){
                                                                for(var i=0;i<msg.length;i++){
                                                                    console.log("选择了就职地");
                                                                    option += "<option value='" + msg[i]['id'] + "'>" + msg[i]['city'] + "</option>";

                                                                }
                                                                $("#select2").html(option);//将循环拼接的字符串插入第二个下拉列表

                                                                $("select option").each(function() {    //删除重复数据
                                                                    var text = $(this).text();
                                                                    if($("select option:contains("+text+")").length > 1)
                                                                        $("select option:contains("+text+"):gt(0)").remove();
                                                                });
                                                                console.log('删除重复数据');
                                                            }
                                                        },

                                                        error:function(msg){
                                                            alert('筛选失败');
                                                        }
                                                    });
                                                };
                                            },
                                            error:function (msg) {
                                                alert('对不起！数据库断开连接' + 'componentDidMount5.3');
                                            }})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    //筛选按钮点击事件
    handleClickSelect() {
        var select1=$("#select1 option:selected");  //获取选中的项
        var select2=$("#select2 option:selected");
        var str = $("#head").html();
        var str2 = str.substring(0,str.length-2);
        var address;

        if(str2 == '江南東道' || str2 == '關內道' || str2 == '河東道' || str2 == '都畿道' || str2 == '河北道' || str2 == '河南道'
            || str2 =='嶺南道' || str2 == '黔中道' || str2 == '劍南道' || str2 == '隴右道' || str2 == '山南西道' || str2 == '山南東道'
            || str2 == '江南西道' || str2 == '淮南道' || str2 =='京畿道') {
            address = "/address?addressName_tang="+str2;
        }

        else if(str2 == '成都府路' || str2 == '福建路' || str2 == '廣南東路' || str2 == '廣南西路' || str2 == '河北東路' || str2 == '河北西路'
            || str2 == '河東路' || str2 == '淮南東路' || str2 == '淮南西路' || str2 == '京東東路' || str2 =='京東西路' || str2 == '荊湖北路'
            || str2 == '荊湖南路' || str2 == '京畿路' || str2 == '江南東路' || str2 == '江南西路' || str2 == '京西北路' || str2 == '京西南路'
            || str2 == '夔州路' || str2 == '利州路' || str2 == '兩浙路' || str2 == '秦鳳路' || str2 == '永興軍路' || str2 == '梓州路'){
            address = "/address?addressName_song="+str2;
        }

        else if(str2 == '瓊州' ||str2 == '琉球' ||str2 == '湖广行中書省' ||str2 == '河南江北行中書省' ||str2 == '宣政院轄地' ||str2 == '遼陽行中書省'
            ||str2 == '江西行中書省' || str2 =='四川行中書省' || str2 =='雲南行中書省' || str2 =='山西行中書省' || str2 =='甘肅行中書省'
            || str2 == '察合台漢國' || str2 =='嶺北行中書省' || str2 =='中書省' || str2 =='江浙行中書省'){
            address = "/address?addressName_yuan="+str2;
        }

        else if(str2 == '貴州布政司' || str2 == '山東布政司' || str2 == '江西布政司' || str2 == '河南布政司' || str2 == '遼寧布政司'
            || str2 == '山西布政司' || str2 == '安徽布政司' || str2 == '福建布政司' || str2 == '浙江布政司' || str2 == '江蘇布政司'
            || str2 == '海南布政司' || str2 == '台灣布政司' || str2 == '京師布政司' || str2 == '廣東布政司' || str2 == '奴兒干都司'
            || str2 == '陝西布政司' || str2 == '湖廣布政司' || str2 == '交險布政司' || str2 == '乌丝藏独丝' || str2 == '四川布政司'
            || str2 == '雲南布政司' ){
            address = "/address?addressName_ming="+str2;
        }

        else if(str2 == '新疆省' || str2 == '西藏省' || str2 == '青海省' || str2 == '雲南省' || str2 == '廣西省' || str2 == '湖南省'
            || str2 == '陝西省' || str2 == '湖北省' || str2 == '貴州' || str2 == '山東省' || str2 == '江西省' || str2 == '河南省'
            || str2 == '遼寧省' || str2 == '山西省' || str2 == '安徽省' || str2 == '福建省' || str2 == '浙江省' || str2 == '江蘇省'
            || str2 == '海南省' || str2 == '台灣省' || str2 == '烏里雅蘇臺' || str2 == '京师' || str2 == '甘肅省' || str2 == '內蒙古省'
            || str2 == '吉林省' || str2 == '庫頁島' || str2 == '黑龍江省' || str2 == '四川省' || str2 == '廣東省'){
            address = "/address?addressName_qing="+str2;
        }

        console.log(address);

        $.ajax({
            type: "get",
            dataType: "json",//数据格式
            url: address,  //请求地址

            success: function(msg){
                console.log('加载表格');

                $("#info  tr:not(:first)").empty("");  //清空表

                for(var i = 0 ;i < msg.length;i++){
                    var tr="";
                    var n=i+1;
                    if(select1.text() =="官职名" && msg[i]['office_name'] == select2.text()){
                        console.log("筛选了官职名："+select2.text());
                        tr='<td>'+n+'</td>' +
                            '<td name = "chName1"  style="text-decoration:underline;cursor:pointer;color: dodgerblue" alt="查询详情" title="查询详情">'+msg[i]['chName']+'</td>' +
                            '<td>'+msg[i]['office_name']+'</td>' +
                            '<td>'+msg[i]['city']+'</td>' +
                            '<td>'+msg[i]['firstyear']+'</td>' +
                            '<td>'+msg[i]['lastyear']+'</td>';
                        $("#info").append('<tr>'+tr+'</tr>')
                    }

                    else if (select1.text() =='就职地' && msg[i]['city'] == select2.text()){
                        console.log("筛选了就职地："+select2.text());
                        tr='<td>'+n+'</td>' +
                            '<td name = "chName1"  style="text-decoration:underline;cursor:pointer;color: dodgerblue" alt="查询详情" title="查询详情">'+msg[i]['chName']+'</td>' +
                            '<td>'+msg[i]['office_name']+'</td>' +
                            '<td>'+msg[i]['city']+'</td>' +
                            '<td>'+msg[i]['firstyear']+'</td>' +
                            '<td>'+msg[i]['lastyear']+'</td>';
                        $("#info").append('<tr>'+tr+'</tr>')
                    }
                }
            },
            error:function(msg){
                alert('筛选请求失败');
            }
        })


        var _this = this;
        $("#info").on("click","td[name=chName1]",function(){
            var chName1 = $(this).html();
            _this.setState({mpName: chName1 })

            if (_this.state.mpName!=" "){
                _this.setState({
                        mPerson: {},
                        isLoaded: false,
                        isInput:true},
                    () => {
                        //这里打印的是最新的state值
                        console.log(_this.state.isInput)
                        if (_this.state.isInput) {
                            if(_this.state.isradio == 1) {
                                const url = "/person?mpName=" + chName1 + "&dataType=1"
                                console.log(url)
                                let count = _this.state.maxRelationValue
                                setTimeout(() => {
                                    axios.get(url)
                                        .then(response => {
                                            const result = response.data
                                            if (result['err'] == 1) {
                                                alert("数据库没有该历史人物的数据,请重新输入")
                                            } else {
                                                for (let i = 0; i < result.assocPersons.length; i++) {
                                                    if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                                        count = parseInt(result.assocPersons[i].assocCode, 10)
                                                    }
                                                }
                                                _this.setState({
                                                    mPerson: response.data,
                                                    isLoaded: true,
                                                    maxRelationValue: count
                                                })
                                            }
                                        })
                                        .catch(error => {
                                            // debugger
                                            alert('对不起！数据库断开连接' + 'handleClickSelect6.1')
                                            _this.setState({
                                                isInput: false
                                            })
                                        })
                                }, 1000)
                            }

                            else if(_this.state.isradio == 2){
                                const url = "/person?mpName="+chName1+"&dataType=2"
                                let count = this.state.maxRelationValue
                                console.log(url)
                                setTimeout(() => {
                                    axios.get(url)
                                        .then(response => {
                                            const result = response.data
                                            for (let i = 0; i < result.kinPersons.length; i++) {
                                                if (count < parseInt(result.kinPersons[i].kinCode, 10)) {
                                                    count = parseInt(result.kinPersons[i].kinCode, 10)
                                                }
                                            }
                                            if(result['err'] == 1)
                                            {
                                                alert("数据库没有该历史人物的数据,请重新输入")
                                            }

                                            else{
                                                _this.setState({
                                                    mPerson:response.data,
                                                    isLoaded: true,
                                                    maxRelationValue: count
                                                })
                                            }
                                        })
                                        .catch(error => {
                                            // debugger
                                            alert('对不起！数据库断开连接' + 'handleClickSelect6.2')
                                            _this.setState({
                                                isInput: false
                                            })
                                        })
                                },1000)

                            }
                            else if (_this.state.isradio == 3){
                                let result = {}
                                const url_1 = "/person?mpName=" + chName1 + "&dataType=1"
                                const url_2 = "/person?mpName=" + chName1 + "&dataType=2"
                                let count = _this.state.maxRelationValue
                                axios.get(url_1)
                                    .then(response => {
                                        result = response.data
                                        if(result['err'] == 1)
                                        {
                                            alert("数据库没有该历史人物的数据,请重新输入")
                                        }else {
                                            for (let i = 0; i < result.assocPersons.length; i++) {
                                                if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
                                                    count = parseInt(result.assocPersons[i].assocCode, 10)
                                                }
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        // debugger
                                        console.log(error)
                                        alert('对不起！数据库断开连接' + 'handleClickSelect6.3')
                                        _this.setState({
                                            isInput: false
                                        })
                                    })
                                setTimeout(() => {
                                    axios.get(url_2)
                                        .then(response => {
                                            const result_2 = response.data
                                            for (let i = 0; i < result_2.kinPersons.length; i++) {
                                                if (count < parseInt(result_2.kinPersons[i].kinCode, 10)) {
                                                    count = parseInt(result_2.kinPersons[i].kinCode, 10)
                                                }
                                            }
                                            $.extend(true, result, result_2)
                                            _this.setState({
                                                mPerson: result,
                                                isLoaded: true,
                                                maxRelationValue: count
                                            })
                                        })
                                        .catch(error => {
                                            // debugger
                                            console.log(error)
                                            alert('对不起！数据库断开连接' + 'handleClickSelect6.4')
                                            _this.setState({
                                                isInput: false
                                            })
                                        })
                                }, 1000)
                            }
                            else {
                                alert("请求失败")
                            }
                        }
                    });
            }
        })
    }

    render() {
        let data;
        let div;
        let number = 0
        if(this.state.isLoaded){
            let name = this.state.mpName;
            if(this.state.isradio==1){
                let  mPerson = this.state.mPerson
                data = {
                    nodes: [{name: mPerson.chName, gruop: 0, tag: 1}],
                    edges: []
                }
                for (let i = 0; i < mPerson.assocPersons.length; i++) {
                    if (parseInt(mPerson.assocPersons[i].assocCode, 10) < this.state.relationValue) {
                        number = number + 1
                        data.nodes.push({
                            name: mPerson.assocPersons[i].assocPersonName,
                            group: parseInt(mPerson.assocPersons[i].assocCode, 10),
                            tag: 1
                        })
                        data.edges.push({
                            "source": 0,
                            "target": number,
                            "relation": mPerson.assocPersons[i].assocName,
                            value: parseInt(mPerson.assocPersons[i].assocCode, 10)
                        })
                    }
                }
                console.log(data)

                const address  = "/person?mpName="+name+"&dataType=3" //任职信息
                const address1 = "/person?mpName="+name+"&dataType=4" //生平信息
                const address2 = "/person?mpName="+name+"&dataType=5" //著作信息

                /**********************************************任职信息***********************************************************/
                setTimeout(() => {
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address,  //请求地址


                        success: function(msg){
                            console.log('information loading:' + msg);

                            $("#info1 tr:not(:first)").empty("");
                            $("#head2").html("");
                            $("#head2").html(name+"任职信息");
                            console.log("information request url:"+ address )

                            if(msg['err'] == 1 || !msg['postPersons']){                               /*无数据的情况下*/
                                var tr = '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' ;
                                $("#info1").append('<tr>'+tr+'</tr>')
                            }

                            else{
                                var msg1 = msg['postPersons'];
                                for(var i=0 ;i <msg1.length;i++){
                                    var tr="";
                                    var n=i+1;
                                    var addressName = msg1[i]['addressName'];
                                    tr='<td>'+n+'</td>' +
                                        /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                                        '<td>'+msg1[i]['firstYear']+'</td>' +
                                        '<td>'+msg1[i]['lastYear']+'</td>' +
                                        '<td>'+msg1[i]['officeName']+'</td>' +
                                        /*'<td  id="m1" href="http://localhost:3000/#/simple-force-chart?name="+name>'+msg1[i]['addressName']+'</td>';*/
                                        '<td>'+msg1[i]['addressName']+'</td>';
                                    $("#info1").append('<tr>'+tr+'</tr>')
                                }
                            }
                        },
                        error:function(msg){
                            alert('对不起！数据库断开连接' + 'render()7.1')
                        }
                    })
                },1000)

                /**********************************************生平信息***********************************************************/
                setTimeout(() => {
                    $.ajax({
                        type: "get",
                        dataType: "json",//数据格式
                        url: address1,  //请求地址

                        success: function (msg) {
                            console.log('生平 information loading:' + msg);

                            $("#id1").html("姓    名:"); //先清空
                            $("#id2").html("别    号:");
                            $("#id3").html("籍    贯:");
                            $("#id4").html("生    年:");
                            $("#id5").html("卒    年:");
                            $("#id6").html("寿    命:");
                            $("#id7").html("入 仕 门:");
                            $("#id8").html("入仕类别:");
                            $("#id9").html("社会区分:");


                            if (msg['err'] == 1 || !msg['basicInfo']) {
                                $("#id1").append(name);
                                $("#id2").append("无数据");
                                $("#id3").append("无数据");
                                $("#id4").append("无数据");
                                $("#id5").append("无数据");
                                $("#id6").append("无数据");
                                $("#id7").append("无数据");
                                $("#id8").append("无数据");
                                $("#id9").append("无数据");
                            }
                            else {
                                var msg1 = msg['basicInfo'];

                                $("#id1").append(name);
                                $("#id2").append(msg1['aliasName']);
                                $("#id3").append(msg1['addrName']);
                                $("#id4").append(msg1['yearBirth'] + '(' + msg1['eraBirth'] + ')');
                                $("#id5").append(msg1['yearDeath'] + '(' + msg1['eraDeath'] + ')');
                                $("#id6").append(msg1['yearsLived'] + '岁');
                                $("#id7").append(msg1['rushiDoor']);
                                $("#id8").append(msg1['rushiType']);
                                $("#id9").append(msg1['statusName']);
                            }
                        },
                        error:function(msg){
                            alert('对不起！数据库断开连接' + 'render()7.2')
                        }
                    })
                },1000)



                setTimeout(() => {
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address2,  //请求地址

                        success: function(msg){

                            $("#id10").html("作   品:");
                            if(msg['err'] == 1 || !msg['personTexts']){   //无数据的情况下
                                $("#id10").append("无数据");
                            }

                            else{
                                var msg2 = msg['personTexts'];
                                console.log("2222222222222:" + msg2);
                                for (var i=0 ;i <msg2.length ;i++){
                                    $("#id10").append('作品名:'+msg2[i]['textName'] + '  著作年代:' +msg2[i]['year'] +'  角色:'+msg2[i]['role']);
                                    $("#id10").append('<br />');
                                }
                            }
                        },
                        error:function(msg){
                            alert('对不起！数据库断开连接' + 'render()7.3')
                        }
                    })
                },1000)
            }

            else if (this.state.isradio==2) {
                    let mPerson = this.state.mPerson
                    data = {
                        nodes: [{name: mPerson.chName, group: 0, tag: 1}],
                        edges: []
                    }
                    for (let i = 0; i < mPerson.kinPersons.length; i++) {
                        if (parseInt(mPerson.kinPersons[i].kinCode, 10) < this.state.relationValue) {
                            number = number + 1
                            data.nodes.push({
                                name: mPerson.kinPersons[i].kinPersonName,
                                group: parseInt(mPerson.kinPersons[i].kinCode, 10),
                                tag: 2
                            })
                            data.edges.push({
                                "source": 0,
                                "target": number,
                                "relation": mPerson.kinPersons[i].kinRelName,
                                value: parseInt(mPerson.kinPersons[i].kinCode, 10)
                            })
                        }

                    }

                    const address  = "/person?mpName="+name+"&dataType=3" //任职信息
                const address1 = "/person?mpName="+name+"&dataType=4" //生平信息
                const address2 = "/person?mpName="+name+"&dataType=5" //著作信息

                /**********************************************任职信息***********************************************************/
                setTimeout(() => {
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address,  //请求地址

                        success: function(msg){
                            console.log('information loading:' + msg);

                            $("#info1 tr:not(:first)").empty("");
                            $("#head2").html("");
                            $("#head2").html(name+"任职信息");
                            console.log("information request url:"+ address )

                            if(msg['err'] == 1 || !msg['postPersons']){                               /*无数据的情况下*/
                                var tr = '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' +
                                    '<td>'+'无数据'+'</td>' ;
                                $("#info1").append('<tr>'+tr+'</tr>')
                            }

                            else{
                                var msg1 = msg['postPersons'];
                                for(var i=0 ;i <msg1.length;i++){
                                    var tr="";
                                    var n=i+1;
                                    var addressName = msg1[i]['addressName'];
                                    tr='<td>'+n+'</td>' +
                                        /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                                        '<td>'+msg1[i]['firstYear']+'</td>' +
                                        '<td>'+msg1[i]['lastYear']+'</td>' +
                                        '<td>'+msg1[i]['officeName']+'</td>' +
                                        /*'<td  id="m1" href="http://localhost:3000/#/simple-force-chart?name="+name>'+msg1[i]['addressName']+'</td>';*/
                                        '<td>'+msg1[i]['addressName']+'</td>';
                                    $("#info1").append('<tr>'+tr+'</tr>')
                                }
                            }
                        },
                        error:function(msg){
                            alert('对不起！数据库断开连接' + 'render()7.4')
                        }
                    })
                },1000)



                /**********************************************生平信息***********************************************************/
                setTimeout(() => {
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address1,  //请求地址

                        success: function(msg){
                            console.log('生平 information loading:' + msg);

                            $("#id1").html("姓    名:"); //先清空
                            $("#id2").html("别    号:");
                            $("#id3").html("籍    贯:");
                            $("#id4").html("生    年:");
                            $("#id5").html("卒    年:");
                            $("#id6").html("寿    命:");
                            $("#id7").html("入 仕 门:");
                            $("#id8").html("入仕类别:");
                            $("#id9").html("社会区分:");
                            $("#id10").html("作   品:");

                            if(msg['err'] == 1 || !msg['basicInfo']){
                                $("#id1").append(name);
                                $("#id2").append("无数据");
                                $("#id3").append("无数据");
                                $("#id4").append("无数据");
                                $("#id5").append("无数据");
                                $("#id6").append("无数据");
                                $("#id7").append("无数据");
                                $("#id8").append("无数据");
                                $("#id9").append("无数据");
                            }

                            else{
                                var msg1 = msg['basicInfo'];

                                $("#id1").append(name);
                                $("#id2").append(msg1['aliasName']);
                                $("#id3").append(msg1['addrName']);
                                $("#id4").append(msg1['yearBirth'] + '(' +msg1['eraBirth'] + ')');
                                $("#id5").append(msg1['yearDeath'] + '('+ msg1['eraDeath'] + ')');
                                $("#id6").append(msg1['yearsLived']);
                                $("#id7").append(msg1['rushiDoor']);
                                $("#id8").append(msg1['rushiType']);
                                $("#id9").append(msg1['statusName']);
                            }
                        },
                        error:function(msg){
                            alert('对不起！数据库断开连接' + 'render()7.5')
                        }
                    })
                },1000)

                setTimeout(() => {
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address2,  //请求地址

                        success: function(msg){

                            if(msg['err'] == 1 || !msg['personTexts']){   //无数据的情况下
                                $("#id10").append("无数据");
                            }

                            else{
                                var msg2 = msg['personTexts'];
                                for (var i=0 ;i <msg2.length ;i++){
                                    $("#id10").append('作品名:'+msg2[i]['textName'] + '  著作年代:' +msg2[i]['year'] +'  角色:'+msg2[i]['role']);
                                    $("#id10").append('<br />');
                                }
                            }
                        },
                        error:function(msg){
                            alert('对不起！数据库断开连接' + 'render()7.6')
                        }
                    })
                },1000)

            }
            else if (this.state.isradio==3) {
                let mPerson = this.state.mPerson
                data = {
                    nodes: [{name: mPerson.chName, group: 0, tag: 1}],
                    edges: []
                }
                for (let i = 0; i < mPerson.assocPersons.length; i++) {
                    if (parseInt(mPerson.assocPersons[i].assocCode, 10) < this.state.relationValue) {
                        number = number + 1
                        data.nodes.push({
                            name: mPerson.assocPersons[i].assocPersonName,
                            group: parseInt(mPerson.assocPersons[i].assocCode, 10),
                            tag: 1
                        })
                        data.edges.push({
                            "source": 0,
                            "target": number,
                            "relation": mPerson.assocPersons[i].assocName,
                            value: parseInt(mPerson.assocPersons[i].assocCode, 10)
                        })
                    }
                }
                console.log(number)
                for (let j = 0; j < mPerson.kinPersons.length; j++) {
                    if (parseInt(mPerson.kinPersons[j].kinCode, 10) < this.state.relationValue) {
                        number = number + 1
                        data.nodes.push({
                            name: mPerson.kinPersons[j].kinPersonName,
                            group: parseInt(mPerson.kinPersons[j].kinCode, 10),
                            tag: 2
                        })
                        data.edges.push({
                            "source": 0,
                            "target": number,
                            "relation": mPerson.kinPersons[j].kinRelName,
                            value: parseInt(mPerson.kinPersons[j].kinCode, 10)
                        })
                    }

                }
                const address  = "/person?mpName="+name+"&dataType=3" //任职信息
                const address1 = "/person?mpName="+name+"&dataType=4" //生平信息
                const address2 = "/person?mpName="+name+"&dataType=5" //著作信息

                /**********************************************任职信息***********************************************************/
                $.ajax({
                    type: "get",
                    dataType : "json",//数据格式
                    url: address,  //请求地址

                    success: function(msg){
                        console.log('information loading:' + msg);

                        $("#info1 tr:not(:first)").empty("");
                        $("#head2").html("");
                        $("#head2").html(name+"任职信息");
                        console.log("information request url:"+ address )

                        if(msg['err'] == 1 || !msg['postPersons']){                               /*无数据的情况下*/
                            var tr = '<td>'+'无数据'+'</td>' +
                                '<td>'+'无数据'+'</td>' +
                                '<td>'+'无数据'+'</td>' +
                                '<td>'+'无数据'+'</td>' +
                                '<td>'+'无数据'+'</td>' ;
                            $("#info1").append('<tr>'+tr+'</tr>')
                        }

                        else{
                            var msg1 = msg['postPersons'];
                            for(var i=0 ;i <msg1.length;i++){
                                var tr="";
                                var n=i+1;
                                var addressName = msg1[i]['addressName'];
                                tr='<td>'+n+'</td>' +
                                    /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                                    '<td>'+msg1[i]['firstYear']+'</td>' +
                                    '<td>'+msg1[i]['lastYear']+'</td>' +
                                    '<td>'+msg1[i]['officeName']+'</td>' +
                                    /*'<td  id="m1" href="http://localhost:3000/#/simple-force-chart?name="+name>'+msg1[i]['addressName']+'</td>';*/
                                    '<td>'+msg1[i]['addressName']+'</td>';
                                $("#info1").append('<tr>'+tr+'</tr>')
                            }
                        }
                    },
                    error:function(msg){
                        alert('对不起！数据库断开连接' + 'render()7.7')
                    }
                })


                /**********************************************生平信息***********************************************************/
                $.ajax({
                    type: "get",
                    dataType : "json",//数据格式
                    url: address1,  //请求地址

                    success: function(msg){
                        console.log('生平 information loading:' + msg);

                        $("#id1").html("姓    名:"); //先清空
                        $("#id2").html("别    号:");
                        $("#id3").html("籍    贯:");
                        $("#id4").html("生    年:");
                        $("#id5").html("卒    年:");
                        $("#id6").html("寿    命:");
                        $("#id7").html("入 仕 门:");
                        $("#id8").html("入仕类别:");
                        $("#id9").html("社会区分:");
                        $("#id10").html("作   品:");

                        if(msg['err'] == 1  || !msg['basicInfo'] ){
                            $("#id1").append(name);
                            $("#id2").append("无数据");
                            $("#id3").append("无数据");
                            $("#id4").append("无数据");
                            $("#id5").append("无数据");
                            $("#id6").append("无数据");
                            $("#id7").append("无数据");
                            $("#id8").append("无数据");
                            $("#id9").append("无数据");
                        }

                        else{
                            var msg1 = msg['basicInfo'];

                            $("#id1").append(name);
                            $("#id2").append(msg1['aliasName']);
                            $("#id3").append(msg1['addrName']);
                            $("#id4").append(msg1['yearBirth'] + '(' +msg1['eraBirth'] + ')');
                            $("#id5").append(msg1['yearDeath'] + '('+ msg1['eraDeath'] + ')');
                            $("#id6").append(msg1['yearsLived']);
                            $("#id7").append(msg1['rushiDoor']);
                            $("#id8").append(msg1['rushiType']);
                            $("#id9").append(msg1['statusName']);
                        }
                    },
                    error:function(msg){
                        alert('对不起！数据库断开连接' + 'render()7.8')
                    }
                })

                $.ajax({
                    type: "get",
                    dataType : "json",//数据格式
                    url: address2,  //请求地址

                    success: function(msg){

                        if(msg['err'] == 1 || !msg['personTexts']){   //无数据的情况下
                            $("#id10").append("无数据");
                        }

                        else{
                            var msg2 = msg['personTexts'];
                            console.log("2222222222222:" + msg2);
                            for (var i=0 ;i <msg2.length ;i++){
                                $("#id10").append('作品名:'+msg2[i]['textName'] + '  著作年代:' +msg2[i]['year'] +'  角色:'+msg2[i]['role']);
                                $("#id10").append('<br />');
                            }
                        }
                    },
                    error:function(msg){
                        alert('对不起！数据库断开连接' + 'render()7.9')
                    }
                })
            }

        }
        if (!this.state.isInput){
            div = <h2>请先选择或输入中心人物</h2>
        }else {
            if (this.state.isLoaded){
                div = <D3SimpleForceChart data={data} nameHandler={ this.nameHandler.bind(this)}  style={{height:'100%',width:'100%'}}/>;
            }else {
                div = <h2>Loading...</h2>;
            }
        }
        return (
            <div>
                <Row gutter={10}>
                    <Col md={24}>

                        <div className="gutter-box-timeline1">
                            <Card title="五朝历史人物任职图" bordered={true} style={{height:'1000px',width:'100%'}}>
                                <div id="main" style={{height:'700px',width:'100%'}}>
                                    <div id="dynasty" style={{height:'650',width:'100%'}}> </div>
                                </div>
                                <div id="main2" style={{height:'200px',width:'100%'}}>

                                </div>
                            </Card>
                        </div>

                        <div className="gutter-box-timeline1">
                            <Card title="CBDB人物关系网络" bordered={false} bordered={true} style={{height:'700px',width:'100%'}}>

                                <div className="search bar1">
                                    <input type="text" placeholder="请输入中心人物人名（繁体）:" ref={input => this.msgInput = input}/>{' '}
                                    <button onClick={this.handleClick}>搜索</button>{' '}
                                </div>
                                    <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.test}>
                                        <Radio.Button value="1" id="social"  >社会关系</Radio.Button>
                                        <Radio.Button value="2" id="relative" >亲属关系</Radio.Button>
                                        <Radio.Button value="3" id="all" >全部关系</Radio.Button>
                                    </Radio.Group>
                                <Row>
                                <Col span={2} className="slider-text">关系值:</Col>
                                <Col span={10}>
                                    <Slider min={1} max={this.state.maxRelationValue}
                                            onChange={this.handleChange}
                                            defaultValue={this.state.relationValue}
                                            style={{margin: 5}}/>
                                </Col>
                                </Row>
                                {div}
                            </Card>

                            <Card title="历史人物基本信息" style={{height:'300px',width:'100%'}}>
                                <div className="table-div1" style={{height:'200px'}}>
                                    <p id="id1">姓    名:</p>
                                    <p id="id2">别    号:</p>
                                    <p id="id3">籍    贯:</p>
                                    <p id="id4">生    年:</p>
                                    <p id="id5">卒    年:</p>
                                    <p id="id6">寿    命:</p>
                                    <p id="id7">入 仕 门:</p>
                                    <p id="id8">入仕类别:</p>
                                    <p id="id9">社会区分:</p>
                                    <p id="id10">作   品:</p>
                                </div>
                            </Card>
                        </div>



                        <div className="info-div2">
                            <div className="info-div1">
                                <Card title="五朝历史人物任命情况表" style={{height:'500px'}}>

                                    <div className="select-div">
                                        <select name="select1" id="select1" className="select-style">
                                            <option value="0">--请选择--</option>
                                            <option value="1">官职名</option>
                                            <option value="2">就职地</option>
                                        </select>

                                        <select name="select2" id="select2" className="select-style">
                                            <option value="4">--请选择--</option>
                                        </select>

                                        <button type="button" className="button-style" onClick={this.handleClickSelect}>筛选</button>

                                    </div>

                                    <h2 id="head">信息</h2>
                                    <div className="table-div">
                                        <table className="table" id='info'>
                                            <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>人名</th>
                                                <th>官职名</th>
                                                <th>就职地</th>
                                                <th>始年</th>
                                                <th>终年</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </Card>
                            </div>

                            <div className="info-div1">
                                <Card title="官员任职信息表" style={{height:'500px'}}>
                                    <div>
                                        <div>
                                            <Radio.Group defaultValue="a" buttonStyle="solid" style={{margin:"8px"}} onChange={this.handleClick2}>
                                                <Radio.Button value="a">任职信息</Radio.Button>
                                                <Radio.Button value="b">同年信息</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <h2 id="head2">任职信息</h2>
                                    <div className="table-div">
                                        <table className="table" id='info1'>
                                            <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>上任时间</th>
                                                <th>调任时间</th>
                                                <th>官职名</th>
                                                <th>任官地点</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default  SimpleRelationshipChart;