import React from 'react';
import axios from 'axios';
import { Row, Col, Card,Radio} from 'antd';
import D3SimpleForceChart1 from '../components/charts/D3SimpleForceChart1';
import $ from "jquery";

class SimpleForceChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mpName:" ",
            mPerson: {},
            isInput:false,
            isLoaded: false,
            isradio:1,
        }
        // 将自定义的函数强制绑定为组件对象
        this.handleClick = this.handleClick.bind(this) // 将返回函数中的this强制绑定为指定的对象, 并没有改变原来的函数中的this
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
        this.test = this.test.bind(this)

    }

    handleClick() {
        this.setState({
                mPerson: {},
                isLoaded: false,
                mpName:this.msgInput.value,
                isInput:true},
            () => {
                //这里打印的是最新的state值
                console.log(this.state.isradio)
                console.log(this.state.isInput)
                console.log(this.state.mpName)
                if (this.state.isInput) {
                    const url = "/person?mpName="+this.state.mpName+"&dataType=1"
                    console.log(url)
                    axios.get(url)
                        .then(response => {
                            const result = response.data
                            console.log("result/response.data:")
                            console.log(result)
                            this.setState({
                                mPerson:response.data,
                                isLoaded: true
                            })
                            //response.data.nodes.on("click")
                        })
                        .catch(error => {
                            // debugger
                            console.log(error)
                            alert('对不起！找不到数据！'+error)
                            this.setState({
                                isInput: false
                            })
                        })
                }
            });
        alert("您搜索的人物是:"+this.msgInput.value)

    }
    handleClick1() {
        this.setState({
                mPerson: {},
                mpName:this.msgInput.value,
                isLoaded: false,
                isInput:true},
            () => {
                //这里打印的是最新的state值
                console.log(this.state.isInput)
                console.log(this.state.mpName)
                if (this.state.isInput) {
                    const url = "/person?mpName="+this.state.mpName+"&dataType=1"
                    console.log(url)
                    axios.get(url)
                        .then(response => {
                            const result = response.data
                            console.log("result/response.data:")
                            console.log(result)
                            this.setState({
                                mPerson:response.data,
                                isLoaded: true,
                            })
                        })
                        .catch(error => {
                            // debugger
                            console.log(error)
                            alert('对不起！找不到数据！'+error)
                            this.setState({
                                isInput: false
                            })
                        })
                }
            });
        alert("您搜索的人物是:"+this.msgInput.value)

    }

    test(e){
        this.setState({isradio:e.target.value});
        console.log("this.state.isradiooooooooooooooooooooooo:" + this.state.isradio);
        if (this.state.mpName!=" "){
            this.setState({
                    mPerson: {},
                    isLoaded: false,
                    isInput:true},
                () => {
                    //这里打印的是最新的state值
                    console.log(this.state.isInput)
                    console.log(this.state.mpName)
                    if (this.state.isInput) {
                        if(this.state.isradio == 1){
                            const url = "/person?mpName="+this.state.mpName+"&dataType=1"
                            console.log(url)
                            axios.get(url)

                                .then(response => {
                                    const result = response.data
                                    console.log("result/response.data:")
                                    console.log(result)
                                    this.setState({
                                        mPerson:response.data,
                                        isLoaded: true

                                    })
                                    //response.node.on("click", function(d,i)){}
                                    console.log( "mperson");
                                    console.log( this.state.mPerson);
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！找不到数据！'+error)
                                    this.setState({
                                        isInput: false
                                    })
                                })


                        }

                        if(this.state.isradio == 2){
                            const url = "/person?mpName="+this.state.mpName+"&dataType=2"
                            console.log(url)
                            axios.get(url)

                                .then(response => {
                                    const result = response.data
                                    console.log("result/response.data:")
                                    console.log(result)
                                    this.setState({
                                        mPerson:response.data,
                                        isLoaded: true

                                    })
                                    //response.node.on("click", function(d,i)){}
                                    console.log( "mperson");
                                    console.log( this.state.mPerson);
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！找不到数据！'+error)
                                    this.setState({
                                        isInput: false
                                    })
                                })
                        }
                        else {
                            alert("请求失败1")
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

                    $("#info  tr:not(:first)").empty("");
                    $("#head2").html("");
                    $("#head2").html(name+"任职信息");
                    $('#info tr:eq(0) th:eq(1)').html("上任时间")//更换表头
                    $('#info tr:eq(0) th:eq(2)').html("调任时间")//更换表头
                    $('#info tr:eq(0) th:eq(3)').html("官职名")//更换表头
                    $('#info tr:eq(0) th:eq(4)').html("任官地点")//更换表头

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
                        $("#info").append('<tr>'+tr+'</tr>')
                        console.log(tr);
                    }

                    console.log(msg1);
                },
                error:function(msg){
                    alert('对不起！找不到数据！');
                }
            })

        }
        else if (index == 'b'){
            var year = $("#id4").html();
            var arr = year.split(":");
            var arr1 = arr[1].split("(");
            console.log( "yyyyyyyyyyyyyyyyyyy" +arr1[0])
            var address = "/address?firstYear=" + arr1[0];

            $.ajax({
                type: "get",
                dataType : "json",//数据格式
                url: address,  //请求地址

                success: function(msg) {

                    $("#info  tr:not(:first)").empty("");
                    $("#head2").html("");
                    $("#head2").html(name+"同年当官历史人物");
                    $('#info tr:eq(0) th:eq(1)').html("姓名")//更换表头
                    $('#info tr:eq(0) th:eq(2)').html("就职地")//更换表头
                    $('#info tr:eq(0) th:eq(3)').html("出生地")//更换表头
                    $('#info tr:eq(0) th:eq(4)').html("官职名")//更换表头

                    for(var i=0 ;i <msg.length;i++){
                        var tr="";
                        var n=i+1;

                        tr= '<td>'+n+'</td>' +
                            /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                            '<td>'+msg[i]['chName']+'</td>' +
                            '<td>'+msg[i]['office_address()']+'</td>' +
                            '<td>'+msg[i]['city']+'</td>' +
                            '<td>'+msg[i]['office_name']+'</td>';
                        $("#info").append('<tr>'+tr+'</tr>')
                        console.log(tr);
                    }
                }

            })
        }

        else{
            console.log("handleClick2:ccccc")
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
                    console.log(this.state.mpName)
                    if (this.state.isInput) {
                        if(this.state.isradio == 1){
                            const url = "/person?mpName="+this.state.mpName+"&dataType=1"
                            console.log(url)
                            axios.get(url)
                                .then(response => {
                                    const result = response.data
                                    console.log("result/response.data:")
                                    console.log(result)
                                    this.setState({
                                        mPerson:response.data,
                                        isLoaded: true

                                    })
                                    //response.node.on("click", function(d,i)){}
                                    console.log( "mperson");
                                    console.log( this.state.mPerson);
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！找不到数据！'+error)
                                    this.setState({
                                        isInput: false
                                    })
                                })
                        }

                        else if(this.state.isradio == 2){
                            const url = "/person?mpName="+this.state.mpName+"&dataType=2"
                            console.log(url)
                            axios.get(url)
                                .then(response => {
                                    const result = response.data
                                    console.log("result/response.data:")
                                    console.log(result)
                                    this.setState({
                                        mPerson:response.data,
                                        isLoaded: true

                                    })
                                    //response.node.on("click", function(d,i)){}
                                    console.log( "mperson");
                                    console.log( this.state.mPerson);
                                })
                                .catch(error => {
                                    // debugger
                                    console.log(error)
                                    alert('对不起！找不到数据！'+error)
                                    this.setState({
                                        isInput: false
                                    })
                                })
                        }
                        else {
                            alert("请求失败2")
                        }

                    }

                });
        }

    }

    render() {
        if (!this.state.isInput){
            return <div className="search bar1">
                <input type="text" placeholder="请输入中心人物人名（繁体）:" ref={input => this.msgInput = input}/>{' '}
                <button onClick={this.handleClick}>搜索</button>{' '}
            </div>
        } else {
            if(!this.state.isLoaded){
                return <div><h1>Loading...</h1></div>
            }
            else {
                let data;
                let name = this.state.mpName;
                if(this.state.isradio==1){
                    let  mPerson = this.state.mPerson
                    data = {nodes:[{name:mPerson.chName},{name:mPerson.assocPersons[1].assocPersonName}],edges:[{ "source": 0 , "target": 1 , "relation":mPerson.assocPersons[1].assocName, value: parseInt(mPerson.assocPersons[1].assocCode,10)}]}
                    for (var i=1;i<mPerson.assocPersons.length;i++){
                        data.nodes.push({name: mPerson.assocPersons[i].assocPersonName})
                        data.edges.push({ "source": 0 , "target": i+1 , "relation":mPerson.assocPersons[i].assocName, value: parseInt(mPerson.assocPersons[i].assocCode,10)})
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

                            $("#info  tr:not(:first)").empty("");
                            $("#head2").html("");
                            $("#head2").html(name+"任职信息");
                            console.log("information request url:"+ address )
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
                                $("#info").append('<tr>'+tr+'</tr>')
                                console.log(tr);
                            }

                            console.log(msg1);
                        },
                        error:function(msg){
                            alert('对不起！找不到数据！');
                        }
                    })


                    /**********************************************生平信息***********************************************************/
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address1,  //请求地址

                        success: function(msg){
                            console.log('生平 information loading:' + msg);
                            var msg1 = msg['basicInfo'];
                            $("#id1").append(name);
                            $("#id2").append(msg1['aliasName']);
                            $("#id3").append(msg1['addrName']);
                            $("#id4").append(msg1['yearBirth'] + '(' +msg1['eraBirth'] + ')');
                           /* $("#id4").append(msg1['yearBirth']);*/
                            $("#id5").append(msg1['yearDeath'] + '('+ msg1['eraDeath'] + ')');
                            $("#id6").append(msg1['yearsLived']);
                            $("#id7").append(msg1['rushiDoor']);
                            $("#id8").append(msg1['rushiType']);
                            $("#id9").append(msg1['statusName']);
                        },
                        error:function(msg){
                            alert('对不起！找不到数据！');
                        }
                    })

                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address2,  //请求地址

                        success: function(msg){
                            var msg2 = msg['personTexts'];
                            /*var msg3 = msg['Text']*/

                            for (var i=0 ;i <msg2.length ;i++){
                                $("#id10").append('作品名:'+msg2[i]['textName'] + '  著作年代:' +msg2[i]['year'] +'  角色:'+msg2[i]['role']);
                                $("#id10").append('<br />');
                            }

                        },
                        error:function(msg){
                            alert('对不起！找不到数据！');
                        }
                    })
                }

                else{
                    let  mPerson = this.state.mPerson
                    data = {nodes:[{name:mPerson.chName},{name:mPerson.kinPersons[1].kinPersonName }],
                        edges:[{ "source": 0 , "target": 1 , "relation":mPerson.kinPersons[1].kinRelName,
                            value: parseInt(mPerson.kinPersons[1].kinCode,10)}]}

                    for (var i=1;i<mPerson.kinPersons.length;i++){
                        data.nodes.push({name: mPerson.kinPersons[i].kinPersonName })
                        data.edges.push({ "source": 0 , "target": i+1 , "relation":mPerson.kinPersons[i].kinRelName, value: parseInt(mPerson.kinPersons[i].kinCode,10)})
                    }

                    const address  = "/person?mpName="+name+"&dataType=3"
                    const address1 = "/person?mpName="+name+"&dataType=4"
                    const address2 = "/person?mpName="+name+"&dataType=5" //著作信息
                    /**********************************************任职信息***********************************************************/
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address,  //请求地址

                        success: function(msg){
                            console.log('information loading');

                            $("#info  tr:not(:first)").empty("");
                            $("#head2").html("");
                            $("#head2").html(name+"信息");  //标题对应鼠标滑过的道名
                            console.log("information request url:"+ address )
                            var msg1 = msg['postPersons'];

                            for(var i=0 ;i <msg1.length;i++){
                                var tr="";
                                var n=i+1;
                                tr='<td>'+n+'</td>' +
                                    /*'<td>'+msg1[i]['officeId']+'</td>' +*/
                                    '<td>'+msg1[i]['firstYear']+'</td>' +
                                    '<td>'+msg1[i]['lastYear']+'</td>' +
                                    '<td>'+msg1[i]['officeName']+'</td>' +
                                    '<td>'+msg1[i]['addressName']+'</td>';
                                $("#info").append('<tr>'+tr+'</tr>')
                                console.log(tr);
                            }

                            console.log(msg1);
                        },
                        error:function(msg){
                            alert('对不起！找不到数据！');
                        }
                    })

                    /**********************************************生平信息***********************************************************/
                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address1,  //请求地址

                        success: function(msg){
                            console.log('生平 information loading:' + msg);
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
                        },
                        error:function(msg){
                            alert('对不起！找不到数据！');
                        }
                    })

                    $.ajax({
                        type: "get",
                        dataType : "json",//数据格式
                        url: address2,  //请求地址

                        success: function(msg){
                            var msg2 = msg['personTexts'];
                            /*var msg3 = msg['Text']*/

                            for (var i=0 ;i <msg2.length ;i++){
                                $("#id10").append('<br />');
                                $("#id10").append('作品名:'+msg2[i]['textName'] + '  著作年代:' +msg2[i]['year'] +'  角色:'+msg2[i]['role']);
                                $("#id10").append('<br />');
                            }

                        },
                        error:function(msg){
                            alert('对不起！找不到数据！');
                        }
                    })

                }
                return (

                    /*<div className="gutter-example simple-force-chart-demo">*/
                    <div >
                        <Row gutter={10}>
                            <Col md={24}>

                                <div className="search bar1">
                                    <input type="text" placeholder="请输入中心人物人名（繁体）:" ref={input => this.msgInput = input}/>{' '}
                                    <button onClick={this.handleClick}>搜索</button>{' '}
                                </div>

                                <div>
                                    <div className="gutter-box-timeline">
                                        <Card title="CBDB人物关系网络" bordered={false} bordered={true} style={{height:'800px',width:'100%'}}>
                                            <form action="" method="post">
                                                {/*<label><input name="relationship" type="radio" value="1" id="social"  defaultChecked  onClick={this.test}/>社会关系 </label>
                                                <label><input name="relationship" type="radio" value="2" id="relative" onClick={this.test}/>亲属关系 </label>*/}
                                                <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.test}>
                                                    <Radio.Button  value="1" id="social"  >社会关系</Radio.Button>
                                                    <Radio.Button value="2" id="relative" >亲属关系</Radio.Button>
                                                </Radio.Group>
                                            </form>
                                            <D3SimpleForceChart1 data={data} nameHandler={ this.nameHandler.bind(this)}/>
                                        </Card>
                                    </div>

                                    <div className="info-div">
                                        <div>
                                            <Card title="官员生平信息表" style={{height:'350px'}}>

                                                <div className="table-div">
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

                                        <div>
                                            <Card title="官员任职信息表" style={{height:'450px'}}>
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
                                                    <table className="table" id='info'>
                                                        <thead>
                                                        <tr>
                                                            <th>序号</th>
                                                            {/*<th>ID</th>*/}
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

                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            }
        }
    }
}
export default SimpleForceChart;