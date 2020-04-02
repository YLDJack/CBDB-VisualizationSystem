import React from 'react';
import PropTypes from 'prop-types'
import { Radio } from 'antd'
import * as d3 from 'd3';
import axios from "axios";

class D3SimpleForceChart1 extends React.Component {
    componentDidMount() {
        const containerWidth = this.chartRef.parentElement.offsetWidth;
        const data = this.props.data;
        const margin = { top: 10, right: 10, bottom: 10, left: 10 };
        const width = containerWidth - margin.left - margin.right;
        const height = 1200 - margin.top - margin.bottom;
        let chart = d3.select(this.chartRef).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
        let g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置
        let simulation = d3.forceSimulation() // 构建力导向图
            .force('link',d3.forceLink().id(function(d, i) { return i; }).distance(function(d) { return d.value * 30; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 3.5));

        let z = d3.scaleOrdinal(d3.schemeCategory20);// 通用线条的颜色

        let link = g.append("g") // 画连接线
            .attr("class", "links")
            .selectAll("line")
            .data(data.edges)
            .enter().append("line");

        let linkText = g.append("g") // 画连接连上面的关系文字
            .attr("class", "link-text")
            .selectAll("text")
            .data(data.edges)
            .enter().append("text")
            .text(function(d){
                return d.relation;
            });

        const self = this

        let node = g.append("g") // 画圆圈和文字
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter().append("g")
            .on("mouseover",function(d,i){
                //显示连接线上的文字
                linkText.style("fill-opacity",function(edge){
                    if( edge.source === d || edge.target === d ){
                        return 1;
                    }
                });
                //连接线加粗
                link.style('stroke-width', function(edge){
                    if( edge.source === d || edge.target === d ){
                        return '2px';
                    }
                }).style('stroke', function(edge){
                    if( edge.source === d || edge.target === d ){
                        return '#000';
                    }
                });
            })
            .on("mouseout",function(d,i){
                //隐去连接线上的文字
                linkText.style("fill-opacity",function(edge){
                    if( edge.source === d || edge.target === d ){
                        return 0;
                    }
                });
                //连接线减粗
                link.style('stroke-width', function(edge){
                    if( edge.source === d || edge.target === d ){
                        return '1px';
                    }
                }).style('stroke', function(edge){
                    if( edge.source === d || edge.target === d ){
                        return '#ddd';
                    }
                });
            })

            .on("click", (d,i) => {
                //return 返回点击的名字到SimpleForceChart.js再去发送请求
                console.log('click', data.nodes[i].name); //获取点击的名字
                self.props.nameHandler(data.nodes[i].name)

            })

            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));;

        node.append('circle')
            .attr("r", 5)
            .attr('fill',function(d, i){return z(i);});

        node.append("text")
            .attr('fill',function(d, i){return z(i);})
            .attr("y", -20)
            .attr("dy", ".71em")
            .text(function(d) { return d.name; });

        simulation // 初始化力导向图
            .nodes(data.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(data.edges);

        /* 这里说明一下对于d3.forceSimulation().force(name)，也就是当force中只有一个参数，这个参数是某个力的名称，那么这段
        代码返回的是某个具体的力，（根据上面图片官方对force的说明也可以知道），例如d3.forceSimulation().force(“link”)，
        则返回的是d3.forceLink()这个力*/

        chart.append('g')// 输出标题
            .attr('class', 'bar--title')
            .append('text')
            .attr('fill', '#000')
            .attr('font-size', '16px')
            .attr('font-weight', '700')
            .attr('text-anchor', 'middle')
            .attr('x', containerWidth / 2)
            .attr('y', 20)
            .text('CBDB人物关系力导向图');

        function ticked() { // 力导向图变化函数，让力学图不断更新
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            linkText
                .attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; })
                .attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });
            node
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        }

        function dragstarted(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }


        //更新函数
        /*
        function update(){
            data.nodes.push({});
            data.edges.push({});

            link = link.data(force.link());
            link.enter()
                .append("line")
                .style("stroke", "#ccc")
                .style("stroke-width", 2);
            link.exit.remove();

            node = node.data(force.nodes());
            nodes.enter().append("circle")
                .attr("r", 40)
                .style("fill", color(colorIndex++))
                .call(force.drag);

            node.exit().remove();
            node.exit().remove();

            force.start();



        }*/
    }



    render() {
        return (
            <div>
                <div>
                    <div className="force-chart--simple">
                        <svg ref={(r) => this.chartRef = r}></svg>
                    </div>
                </div>
            </div>



        )
    }
}
D3SimpleForceChart1.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            name:PropTypes.string.isRequired,
            // href:PropTypes.string.isRequired,
        }).isRequired).isRequired,
        edges: PropTypes.arrayOf(PropTypes.shape({
            source:PropTypes.number.isRequired,
            target:PropTypes.number.isRequired,
            relation:PropTypes.string.isRequired,
        }).isRequired).isRequired,
    }).isRequired
}


export default D3SimpleForceChart1;
