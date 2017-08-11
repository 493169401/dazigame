/**
 * Created by Administrator on 2017/5/11.
 */
function Game(){//属性
    this.charArr=[
        ['a','img/A-Z/A.png'],
        ['b','img/A-Z/B.png'],
        ['c','img/A-Z/C.png'],
        ['d','img/A-Z/D.png'],
        ['e','img/A-Z/E.png'],
        ['f','img/A-Z/F.png'],
        ['g','img/A-Z/G.png'],
        ['h','img/A-Z/H.png'],
        ['i','img/A-Z/I.png'],
        ['j','img/A-Z/J.png'],
        ['k','img/A-Z/K.png'],
        ['l','img/A-Z/L.png'],
        ['m','img/A-Z/M.png'],
        ['n','img/A-Z/N.png'],
        ['o','img/A-Z/O.png'],
        ['p','img/A-Z/P.png'],
        ['q','img/A-Z/Q.png'],
        ['r','img/A-Z/R.png'],
        ['s','img/A-Z/S.png'],
        ['t','img/A-Z/T.png'],
        ['u','img/A-Z/U.png'],
        ['v','img/A-Z/V.png'],
        ['w','img/A-Z/W.png'],
        ['x','img/A-Z/X.png'],
        ['y','img/A-Z/Y.png'],
        ['z','img/A-Z/Z.png']

       ];

    this.charArrlength=5;//每次输出的数组长度，即个数
    this.cw=innerWidth;//获取屏幕宽度
    this.currentEle=[];//当前页面中的元素
    this.currentPos=[];//当前的位置
    this.speed=10;
    this.sm=10;
    this.sc=0;
    this.gq=10;
    this.sm1=document.querySelector('.sm');
    this.sc1=document.querySelector('.sc');
    this.xue=document.querySelector('.xue');
   // this.sm=this.xue.value;
    //console.log(this.xue.value);
    this.small=document.querySelector('.small');
    this.small.width=this.sm;
    console.log(this.small.width);
}
Game.prototype={//构造函数
    //开始 准备
    start:function(){
        this.getElements(this.charArrlength);//调用
        this.drop();
        this.key();
    },
    //获取元素
    getElements:function(length){
        //much what
        for(let i=0;i<length;i++){
            this.getChar();
        }
    },
    //元素去重
    checkRepeat:function(text){
        // return this.currentEle
        return this.currentEle.some(function(value){
            return value.innerText==text;
        })
    },
    //位置去重
    checkPosition:function(){
        return this.currentPos.some(function(value){
            return value+70>lefts&&lefts+70>value;
        })
    },
    //产生字符
    getChar:function(){
        //this.charArr[num]
        let num=Math.floor(Math.random()*this.charArr.length);//随机下标
        //num this.charArr[num][0] this.currentArr[i].innerText
        while(this.checkRepeat(this.charArr[num][0])){
             num=Math.floor(Math.random()*this.charArrlength);
        }
        let ele=document.createElement('div');//创建元素
        let lefts=Math.random()*(this.cw-400)+200,tops=Math.random()*100;//给落下来的字母设置位置，给它一个范围
        while(this.checkPosition(lefts)){
            lefts=Math.random()*(this.cw-400)+200;
        }
        ele.style.cssText=`width:70px;height:70px;
            position:absolute;left:${lefts}px;top:${tops}px;
            background-image:url(${this.charArr[num][1]});background-position:center;background-size:contain;background-repeat:no-repeat;
            text-align:center;line-height:70px;
            font-size:0;`
           //元素样式
        ele.innerText=this.charArr[num][0];//将元素的文本内容设置成随机数组元素
        document.body.appendChild(ele);//插入到页面
        this.currentEle.push(ele);
    },
    //下落
    drop:function(){
        let self=this;
        //时间函数 保存成属性
        self.t=setInterval(function(){
            for(let i=0;i<self.currentEle.length;i++){
                let tops=self.currentEle[i].offsetTop+self.speed;
                self.currentEle[i].style.top=tops+'px';
                if(tops>500){
                    document.body.removeChild(self.currentEle[i]);//页面中删除
                    self.currentEle.splice(i,1);//数组中删除位置 数量
                    self.sm--;
                    //console.log(self.sm)
                    self.sm1.innerText=self.sm;
                    // self.xue.value=(self.sm/10)*100;
                    self.small.style.width=(self.sm/10)*100+'%';
                    //重新开始
                    if(self.sm<0){
                        self.sm1.innerText=0;
                        self.restart();
                    }
                    if(self.sm==0){
                        let flag=window.confirm('游戏结束，是否继续？');
                        if(flag){
                            self.restart();
                        }else{
                            close();
                        }
                    }
                }

            }
            if(self.currentEle.length<self.charArrlength){
                self.getChar();
            }

        },600)
    },
    //敲击键盘
    key:function(){
        document.body.onkeydown=function(e){
            //e.keyCode获得键盘码数字   e.innerText 字母   fromCharcode返回字符串编码
            let code= String.fromCharCode(e.keyCode); //（）中是一个数字，返回一个字母 code是键盘输入的
            code=code.toLowerCase();//转换成小写 大小写要对应
            for(let i=0;i<this.currentEle.length;i++){
                if( code == this.currentEle[i].innerText){
                    document.body.removeChild(this.currentEle[i]);
                    this.currentEle.splice(i,1);
                    this.sc++;
                    this.sc1.innerText=this.sc;
                    //下一关
                    if(this.sc>=this.gq){
                        this.next();
                    }
                }
            }
            if(this.currentEle.length<this.charArrlength){
                this.getChar();
            }

        }.bind(this);
    },
    //重新开始
    restart:function(){
        /* 初始状态
         停止*/
        clearInterval(this.t);
        for(let i=0;i<this.currentEle.length;i++){
            document.body.removeChild(this.currentEle[i]);
        }
        this.currentEle=[];
        this.sm=10;
        this.sm1.innerText=this.sm;
        this.sc=0;
        this.sc1.innerText=this.sc;
        this.start();
    },
    //下一关
    next:function(){
        clearInterval(this.t);
        for(let i=0;i<this.currentEle.length;i++){
            document.body.removeChild(this.currentEle[i])
        }
        this.currentEle=[];
        this.charArrlength++;
        this.gq+=10;
        let flag=window.confirm('进入下一关吗？');
        if(flag){
            this.start();
        }else{
            close();
        }

        // this.start();
    }
}

/* 一定高度从页面中消失，在数组中删除
 页面重元素小于默认的5，在添加一个，调用getchar
 键盘事件：keyCode=字符串编码的时，*/