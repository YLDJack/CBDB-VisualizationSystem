import React from 'react';
import { Row, Col, Card } from 'antd';
import echarts from 'echarts';
import  {Link} from  'react-router-dom';
import $ from 'jquery';

class SimpleMapTimelineChart extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var address;
        var myChart = echarts.init(document.getElementById('main'));
        myChart.showLoading();   //加载动画

        myChart.hideLoading();  //动画消失

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

        var option = {
            baseOption: {
                timeline: {
                    // y: 0,
                    axisType: 'category',
                    // realtime: false,
                    loop: false,
                    data: ['唐', '宋', '元', '明', '清'],
                    autoPlay: false,
                    playInterval: 1000,//循坏的时间
                },
            },

            options: [
                {
                    title: {text: '唐代地图'},
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
                    }
                },

                {
                    title: { text:'宋朝（X年）地图'},
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
            console.log(address);


            $("#select1").val(0);//设置每次点击地图后都是默认<请选择>选项

            $.ajax({
                type: "get",
                dataType : "json",//数据格式
                url: address,  //请求地址
                //http://120.78.126.252/CBDB/address?addressName=江南東道

                success: function(msg){
                    console.log('loading');

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

                        for(var i = 0 ;i < msg.length;i++){
                            var tr="";
                            var n=i+1;
                            /*var info = JSON.stringify(msg);
                            var data = eval('('+ info +')');
                            tr='<td>'+n+'</td>' +
                                '<td>'+data[i]['chName']+'</td>' +
                                '<td>'+data[i]['office_name']+'</td>' +
                                '<td>'+data[i]['city']+'</td>' +
                                '<td>'+data[i]['firstyear']+'</td>' +
                                '<td>'+data[i]['lastyear']+'</td>';
                            $("#info").append('<tr>'+tr+'</tr>');
                            console.log(data[i]['lastyear']);*/
                            tr='<td>'+n+'</td>' +
                                '<td>'+msg[i]['chName']+'</td>' +
                                '<td>'+msg[i]['office_name']+'</td>' +
                                '<td>'+msg[i]['city']+'</td>' +
                                '<td>'+msg[i]['firstyear']+'</td>' +
                                '<td>'+msg[i]['lastyear']+'</td>';
                            $("#info").append('<tr>'+tr+'</tr>');
                        }
                    }
                    console.log(msg);
                },
            })
        });

        //筛选事件
        var select = document.getElementById("select1");
        select.onchange=function(params){
            var selvalue = select.value;
            var val = document.getElementById("select2");
            var option;

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
            console.log(address);


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

                       /* $("select option").each(function() {    //删除重复数据
                            var text = $(this).text();
                            if($("select option:contains("+text+")").length > 1)
                                $("select option:contains("+text+"):gt(0)").remove();
                        });
                        console.log('删除重复数据');*/
                    }
                },

                error:function(msg){
                    alert('筛选失败');
                }
            });
        };
    }

    //筛选按钮点击事件
    handleClick() {
        var select1=$("#select1 option:selected");  //获取选中的项
        var select2=$("#select2 option:selected");
        var str = $("#head").html();
        var str2 = str.substring(0,str.length-2);
        console.log(str);
        console.log(str2);
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
                            '<td>'+msg[i]['chName']+'</td>' +
                            '<td>'+msg[i]['office_name']+'</td>' +
                            '<td>'+msg[i]['city']+'</td>' +
                            '<td>'+msg[i]['firstyear']+'</td>' +
                            '<td>'+msg[i]['lastyear']+'</td>';
                        $("#info").append('<tr>'+tr+'</tr>')
                    }

                    else if (select1.text() =='就职地' && msg[i]['city'] == select2.text()){
                        console.log("筛选了就职地："+select2.text());
                        tr='<td>'+n+'</td>' +
                            '<td>'+msg[i]['chName']+'</td>' +
                            '<td>'+msg[i]['office_name']+'</td>' +
                            '<td>'+msg[i]['city']+'</td>' +
                            '<td>'+msg[i]['firstyear']+'</td>' +
                            '<td>'+msg[i]['lastyear']+'</td>';
                        $("#info").append('<tr>'+tr+'</tr>')
                    }
                }
            },
            error:function(msg){
                alert('读取省份信息失败');
            }
        })
    }


    render() {
        return (
            <div>
                <Row gutter={10}>
                    <Col md={24}>

                        <div className="gutter-box-timeline">
                            <Card title="五朝历史人物任职图" bordered={true} style={{height:'800px',width:'100%'}}>
                                <div id="main" style={{height:'600px',width:'100%'}}>
                                    <div id="dynasty" style={{height:'500px',width:'100%s'}}> </div>

                                </div>
                            </Card>
                        </div>

                        <div className="info-div">
                            <Card title="五朝历史人物任命情况表" style={{height:'800px'}}>

                                <div className="select-div">
                                    <select name="select1" id="select1" className="select-style">
                                        <option value="0">--请选择--</option>
                                        <option value="1">官职名</option>
                                        <option value="2">就职地</option>
                                    </select>

                                    <select name="select2" id="select2" className="select-style">
                                        <option value="4">--请选择--</option>
                                    </select>

                                    <button type="button" className="button-style" onClick={this.handleClick}>筛选
                                    </button>

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
                                            <th>生年</th>
                                            <th>终年</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default  SimpleMapTimelineChart;