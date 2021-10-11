     function pushButton()
   {
     console.log ('Пинаю баттон!');
   	 document.getElementById(arguments[0]).classList.add('active-button');

  	 for (var i=1; i<arguments.length; i++)
   	  {
   	  	document.getElementById(arguments[i]).classList.remove('active-button');
   	    }
   }
   function init()
   {

      /*
    point как объект WPoint

    point = new WPoint(options)

    point.id - номер

    point.line1, line2, line3, line4 -  ЭТО ОБЪЕКТЫ ТИПА WLine

    point.angle_type = 0 - не угол (начало/конец отрезка)
                         = 1 - горизонтальный
                         = 2 - вертикальный
                         = 3 - тройник горизонтальный
                         = 4 - тройник вертикальный
                         = 5 - крестовина
                         = 6 - зигзуг
    point.angle_side01 - к линии Line1
    point.angle_side02 - к линии Line2
    point.angle_side03 - к линии Line3
    point.angle_side04 - к линии Line4
                           = 0 если плечо угла 500мм
                           = число, если плечо угла произвольной длины

   */
   function  WPoint(options)
   {
   	  var defaultOptions={
   	        id: 0,
   	        line1: null,
   	        line2: null,
   	        line3: null,
   	        line4: null,
   	  	    angle_type: 0,
   	  	    angle_side01: 500,
   	  	    angle_side02: 500,
   	  	    angle_side03: 500,
   	  	    angle_side04: 500
           	     }
     // Всё, что не передано берём из дефолта
    for(var option in defaultOptions) this[option] = options && options[option]!==undefined ? options[option] : defaultOptions[option];

   };

   /*
     line = new WLine(options)
     * определяется при объявлении:
     * line.linetype - тип линии: 1 - горизонтальная
                                  2 - вертикальная
                                  3 - диагональная
     * line.width - длина линии в пикселях
     * line.side - направление линии: 1 = прямое, -1 = обратное

     line.leftpoint  } номер левой
     line.rightpoint } и номер правой точки с обеих концов линии

     ~определяется по дефолту
     ~line.millies4=0 - отрезков шинопровода по 4000 мм
     ~line.millies3=0 - отрезков шинопровода по 3000 мм
     ~line.millies2=0 - отрезков шинопровода по 2000 мм
     ~line.millies1=0 - отрезков шинопровода по 1000 мм
     ~line.rest=0 - длина нестандартного отрезка шинопровода в мм
     ~line.zangle=0 - если есть зигзагообразный угол


     хитрая фигня - массив из 0 и 1 outs_***[k], где *** - длина отрезка, k - номер среди одинаковых отрезков где стоят отводы
                    например outs_mil4[2]=1 - среди отрезков шинопровода на 4000мм на 3-м из них - отводы
     ~line.outs = null

   */
   function WLine (options)
      {
         var defaultOptions={
   	  	    millies4: 0,
   	  	    millie3: 0,
   	  	    millies2: 0,
   	  	    millies: 0,
   	  	    rest: 0,
   	  	    zangle: 0

   	     }
      for(var option in defaultOptions) this[option] = options && options[option]!==undefined ? options[option] : defaultOptions[option];

      /*
      нужно добавить метод прорисовки и скрывания линии целиком
      */
      };

  // Трансформаторный ввод

   function Transformator (top,left, type)

     {

        //var topOfRect=new fabric.Polygon([{x:left-3*w, y:top-w},{x:left-1*w, y:top-3*w},{x:left+4*w, y:top-3*w}, {x:left+2*w, y:top-w}], {stroke: '#000', fill:'#666'});
        //topOfRect.hasControls = topOfRect.hasBorders = topOfRect.selectable = false;


     	this.draw=function ()
     	  {
         //  fabric.loadSVGFromURL('http://fabricjs.com/assets/1.svg', function(objects, options) {
       	   if (type==1)

       	   {
       	   fabric.loadSVGFromURL('https://metaenergy.ru/newmetashino/tranformo.svg', function(objects, options) {
           var transformator = fabric.util.groupSVGElements(objects, options);
           transformator.top=top-10;
           transformator.left=left-50;
           canvas.add(transformator);
           canvas.sendToBack(transformator).renderAll();}, null, { crossOrigin: 'anonymous' });
           }

            if (type==2)
            {
           fabric.loadSVGFromURL('https://metaenergy.ru/newmetashino/tranformo.svg', function(objects, options) {
           var transformator = fabric.util.groupSVGElements(objects, options);
           transformator.top=top-10;
           transformator.left=left-30;
           canvas.add(transformator);
           canvas.sendToBack(transformator).renderAll();}, null, { crossOrigin: 'anonymous' });
           }
           if (type==3)
              {
           fabric.loadSVGFromURL('https://metaenergy.ru/newmetashino/transf2.svg', function(objects, options) {
           var transformator = fabric.util.groupSVGElements(objects, options);
           transformator.top=top-10;
           transformator.left=left-30;
           canvas.add(transformator);
           canvas.sendToBack(transformator).renderAll();}, null, { crossOrigin: 'anonymous' });
           }
     	  }

     	this.erase=function ()
     	  {

     	  }
     }

   // Фланцевый
   function Flanz (CY, CX, type)
     {
     	 switch (type){
         case 1:
         var top=new fabric.Polygon([{x:CX-3*w, y:CY+w},{x:CX-2*w, y:CY-w}, {x:CX+2*w, y:CY-w}, {x:CX+w, y:CY+w}], {stroke: '#000', fill:'#aaa'});
         CX=CX-5*w;
         var flanz01=new fabric.Polygon([{x:CX+2*w, y:CY+w}, {x:CX+4*w, y:CY-w}, {x:CX+4*w, y:CY+w}, {x:CX+2*w, y:CY+3*w}], {stroke: '#000', fill:'#ccc'});
         CX=CX+0.75*w;
         var flanz02=new fabric.Polygon([{x:CX+2*w, y:CY+w}, {x:CX+4*w, y:CY-w}, {x:CX+4*w, y:CY+w}, {x:CX+2*w, y:CY+3*w}], {stroke: '#000', fill:'#ccc'});
         CX=CX+0.75*w;
         var flanz03=new fabric.Polygon([{x:CX+2*w, y:CY+w}, {x:CX+4*w, y:CY-w}, {x:CX+4*w, y:CY+w}, {x:CX+2*w, y:CY+3*w}], {stroke: '#000', fill:'#ccc'});
         CX=CX+0.75*w;
         var flanz04=new fabric.Polygon([{x:CX+2*w, y:CY+w}, {x:CX+4*w, y:CY-w}, {x:CX+4*w, y:CY+w}, {x:CX+2*w, y:CY+3*w}], {stroke: '#000', fill:'#ccc'});

         CX=CX+1.75*w;
         var top=new fabric.Polygon([{x:CX-4*w, y:CY+w},{x:CX-2*w, y:CY-w}, {x:CX+4*w, y:CY-w}, {x:CX+2*w, y:CY+w}], {stroke: '#000', fill:'#aaa'});
         break;

          }
        top.hasControls = top.hasBorders = top.selectable = false;
        flanz01.hasControls = flanz01.hasBorders = flanz01.selectable = false;
        flanz02.hasControls = flanz02.hasBorders = flanz02.selectable = false;
        flanz03.hasControls = flanz03.hasBorders = flanz03.selectable = false;
        flanz04.hasControls = flanz04.hasBorders = flanz04.selectable = false;

        this.draw=function ()
     	  {
     	  	canvas.add(flanz01, flanz02, flanz03, flanz04, top );
     	  	canvas.sendToBack(top);
     	  	canvas.sendToBack(flanz04);
     	  	canvas.sendToBack(flanz03);
     	  	canvas.sendToBack(flanz02);
     	  	canvas.sendToBack(flanz01);
     	  }

     	this.erase=function ()
     	  {
     	  	canvas.remove(flanz01, flanz02, flanz03, flanz04, top);
     	  }
     };


   // Кабельный
   function Cable (top,left, type)
     {  left=left-2.5*w;
     	var rect=new fabric.Rect({
     		left: left-0.5*w,
     		top: top+4*w,
     		fill: '#ccc',
            stroke: '#000',
            originX: 'center',
            originY: 'center',
            strokeWidth: 1,
     		width: 6*w,
     		height: 6*w
     	});
        rect.hasControls = rect.hasBorders = rect.selectable = false;
        var topOfRect=new fabric.Polygon([{x:left-3.5*w, y:top+w},{x:left-1.5*w, y:top-w},{x:left+4.5*w, y:top-w}, {x:left+2.5*w, y:top+w}], {stroke: '#000', fill:'#aaa'});
        var sideOfRect=new fabric.Polygon([{x:left+2.5*w, y:top+w},{x:left+4.5*w, y:top-w},{x:left+4.5*w, y:top+5*w}, {x:left+2.5*w, y:top+7*w}], {stroke: '#000', fill:'#eee'});
         topOfRect.hasControls = topOfRect.hasBorders = topOfRect.selectable = false;
         sideOfRect.hasControls = sideOfRect.hasBorders = sideOfRect.selectable = false;


    if ((type==1)||(type==2)||(type==5))
    {
        var ruchka1= new fabric.Circle({
         radius: 2,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+4*w,
         left: left-1.5*w
        });
        var ruchka2= new fabric.Circle({
         radius: 2,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+4*w,
         left: left-0.5*w
        });
        var ruchka3= new fabric.Circle({
         radius: 2,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+4*w,
         left: left+0.5*w
        });

         ruchka1.hasControls = ruchka1.hasBorders = ruchka1.selectable = false;
		 ruchka2.hasControls = ruchka2.hasBorders = ruchka2.selectable = false;
		 ruchka3.hasControls = ruchka3.hasBorders = ruchka3.selectable = false;
          }

        if (type==3)
          {
         var ruchka1= new fabric.Circle({
         radius: 2,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+2*w,
         left: left+4.5*w
        });
         var ruchka2= new fabric.Circle({
         radius: 2,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+2*w+4,
         left: left+4.5*w-4
        });

        var ruchka3= new fabric.Circle({
         radius: 2,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+2*w+8,
         left: left+4.5*w-8
        });
          }

        if (type==4)
          {
         var ruchka1= new fabric.Circle({
         radius: 3,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+3*w,
         left: left-3.5*w
        });
          }

        if (type==6)
          {
         var ruchka1= new fabric.Circle({
         radius: 3,
         fill: '#000',
         originX: 'center',
         originY: 'center',
         top: top+2*w,
         left: left+4.5*w
        });
          }

        this.draw=function ()
     	  {
     	  	canvas.add(rect,topOfRect, sideOfRect);
     	  	canvas.bringToFront(rect);
     	  	if ((type==1)||(type==2)||(type==5)||(type==3))
     	  	{
     	  		canvas.add(ruchka1, ruchka2, ruchka3);
  	  			canvas.bringToFront(ruchka1, ruchka2, ruchka3);
     	  	}
            if ((type==4)||(type==6))
                {
                	canvas.add(ruchka1);
                	canvas.sendToBack(ruchka1);
                }
            if (type==1)
               canvas.sendToBack(topOfRect);
            if (type==4)
               canvas.sendToBack(sideOfRect);
            if (type==6)
               canvas.sendToBack(rect);
     	  }

     	this.erase=function ()
     	  {
     	  	if ((type==1)||(type==2)||(type==5)||(type==3))
     	  	     	canvas.remove(rect,sideOfRect, topOfRect, ruchka1,ruchka2,ruchka3);
     	  	    else
     	  	      	canvas.remove(rect,sideOfRect, topOfRect, ruchka1);
     	  }
     };


     // Заглушка
   function Zaglushka (top,left)
     {
     	var rect=new fabric.Rect({
     		left: left,
     		top: top,
     		fill: '#000',
            originX: 'center',
            originY: 'center',
            width: 18,
     		height: 6
     	});
        rect.hasControls = rect.hasBorders = rect.selectable = false;


        this.draw=function ()
     	  {
     	  	canvas.add(rect);
     	  	canvas.bringToFront(rect)

     	  }

     	this.erase=function ()
     	  {
     	  	canvas.remove(rect);
     	  }
     };



   /* drawMode - рисование цепочки.
              => init(); - при инициализации режима убирает все eventlisteners которые были до него и вставляет свои:
              => обработка событий
                * click - drawPoint (event)
                        => использует глобальные переменные:
                            - массив points:
                                  points[k] - объект fabric типа "точка"
                                  points[k].id - номер
                                  points[k].line1 - три объекта fabric типа "линия", объединённые в одну линию, приходящие в точку point[k]
                                                    !!! в новой версии рабочих линии две:
                                                    одна рисует широкую плоскость шинопровода, другая узкую.
                                                    Третья линия осталась, но скрыта (я её открываю для тестов рабочих моментов)
                                  points[k].line2 - три линии, выходящие из точки point[k]
                                  points[k].line3 - три линии, выходящие из точки point[k]
                                  points[k].line4 - три линии, выходящие из точки point[k]

                                             В Н И М А Н И Е! Не всегда points[k].line2=points[k+1].line1

                                  points[k].line1.linetype=point[k-1].line2.linetype - тип линии: 1 - горизонтальная
                                                                                                  2 - вертикальная
                                                                                                  3 - диагональная
                                  points[k].line2.width - длина линии в пикселях
                                  points[k].line2.side - направление линии: 1 = прямое, -1 = обратное
                                  points[k].line1.leftpoint  } номер левой
                                  points[k].line1.rightpoint } и номер правой точки с обеих концов линии

                              !!! есть только у line1

                                  points[k].line1.millies4 - отрезков шинопровода по 4000 мм
                                  points[k].line1.millies3 - отрезков шинопровода по 3000 мм
                                  points[k].line1.millies2 - отрезков шинопровода по 2000 мм
                                  points[k].line1.millies1 - отрезков шинопровода по 1000 мм
                                  points[k].line1.rest - длина нестандартного отрезка шинопровода в мм

                                  points[k].angle_type = 0 - не угол (начало/конец отрезка)
                                                       = 1 - горизонтальный
                                                       = 2 - вертикальный
                                                       = 3 - тройник горизонтальный
                                                       = 4 - тройник вертикальный
                                                       = 5 - крестовина
                                  points[k].angle_side01 - к линии Line1
                                  points[k].angle_side02 - к линии Line2
                                  points[k].angle_side03 - к линии Line3
                                  points[k].angle_side04 - к линии Line4
                                                         = 0 если плечо угла 500мм
                                                         = число, если плечо угла произвольной длины



                             - prevPoint={'x':...,'y':..., 'k':...  } - координаты точки, поставленной на поле последней и её номер
                             - переменная start (можно заменить на проверку существования массива points)

                         => использует функции:
                             - putPoint(x,y);
                             - goStraight(x1,x2,y1,y2);
                             - joinPoint(points, id, left,right,top, bottom);
                             - insertPoint(points,id,x,y);
                             - findPoint(points,x,y)

                 * mousemove - drawLine
                         => использует глобальные переменные:
                            - массив points
                            - prevPoint={'x':...,'y':  } - координаты точки, поставленной на поле последней
                            - startLine - глобальный объект fabric типа "линия"

                 * dblclick - stopLine
                         => использует глобальные переменные:
                            - массив points:
                            - переменную start
                         => использует функции:
                             - addSize(points,i); (может, её можно вставить внутрь putPoint?..)

              получает на входе: пустой или полный массив points
              отдаёт на выходе: заполненный массив points, изменённый объект prevPoint (может, присобачить его к points?...)

      editMode - редактирование геометрии.
               => init(); - при инициализации режима убирает все eventlisteners которые были до него
               => обработка событий:
                      object:moving
                         => использует глобальные переменные:
                            - массив points;
                         => использует функции:
                            - fixPoint(p);
                            - reorder (points,id);


                            Углы и тройники автоматически
                            Секции и подключения - вручную
                            Секции: трансформаторная секция, фланцевая, заглушка
                            Прямые автоматом по 4 метра с возможностью корректировки менять до конкретного списка


                            !!! Указывать положение шинопровода в пространстве: плашмя или торчком
                            !!! Учесть толщину шинопровода

   */
      var canvas=new fabric.Canvas('c',{ selection: false });
      var start=0;
      var i=0;
      var prevPoint={
      	'x':0,
      	'y':0,
      	'k':0
      };
      var points=[];
      var lines=[];


      var DrawMode = document.getElementById('draw'),
      EditMode = document.getElementById('edit'),
      EraseMode = document.getElementById('erase'),
      RulerMode = document.getElementById('ruler'),
      ShowSizesubmit = document.getElementById('countPieces'),
      PiecesMode = document.getElementById('straights'),
      Mil4 = document.getElementById('mil4'),
      Mil3 = document.getElementById('mil3'),
      Mil2 = document.getElementById('mil2'),
      Mil = document.getElementById('mil'),
      MilButt =  document.getElementById('value_save'),
      RestButt =  document.getElementById('rest_save'),
      EndsButt =  document.getElementById('check_ends'),
      EndSaveButt = document.getElementById('ends_save'),
      OutSaveButt = document.getElementById('outs_save'),
      CloseButton = document.getElementById('choose_close'),
      SaveButton = document.getElementById('savePicture'),
      Exterminate =  document.getElementById('exterminate'),

      place=document.getElementById('place');          //сама область

      EditMode.onclick=Editing;
      DrawMode.onclick=Drawing;
      EraseMode.onclick=Erasing;
      RulerMode.onclick=PutSizes;
      ShowSizesubmit.onclick=SizeRequest;
      PiecesMode.onclick=CountPieces;
      Mil4.onchange=ChangePieces;
      Mil3.onchange=ChangePieces;
      Mil2.onchange=ChangePieces;
      Mil.onchange=ChangePieces;
      MilButt.onclick=SavePieces;
      RestButt.onclick=RestSave;
      EndsButt.onclick=ChooseEnds;
      EndSaveButt.onclick=SaveEnds;
      OutSaveButt.onclick=SaveOuts;
      CloseButton.onclick=CloseTable;
      SaveButton.onclick=ProcessResult;

      Exterminate.onclick=MakeBlank;

      function MakeBlank()

      {
      	canvas.clear();
      	canvas.renderAll();

       start=0;
       i=0;
       prevPoint={
      	'x':0,
      	'y':0,
      	'k':0
         };
       points=[];
       lines=[];
       console.log(points);
      }

     // Направляющие
      var startLine=new fabric.Line([0,0,0,0], {stroke: 'rgba(0,255,0,0.3)'});
   	  canvas.add(startLine);

     // Поставить точку

        // точка превратилась в квадратики
      function putPoint(x,y)
      {
        var point=new fabric.Rect({
          left: x,
          top: y,
          fill: 'white',
          stroke: '#336666',
          originX:'center',
          originY:'center',
          width: 14,
          height: 14,
          strokeWidth: 2,
                 });
         point.hasControls = point.hasBorders = point.selectable = false;
         point.x=x;
         point.y=y;
         point.name="point";
         console.log(point);
         return point;
    }
    // куда попала точка
    function findPoint(points,x,y)
    {
     for (var i=0; i<points.length; i++)
         {
            if ((Math.abs(x-points[i].left)<=20)&&(Math.abs(y-points[i].top)<=20))
               return points[i];
           }
          return null;
         }


    // После какой точки попала точка
    function findAfterPoint(points,x,y)
    {
   //  var text=new fabric.Text('Чекаем ('+x+', '+y+')', {left: 10, top: 0, fontSize: 14, fontFamily: 'Century Gothic'});
   //  canvas.add(text);
     var side, horizontal, x_between, y_ver, vertical, x_hor, y_between, diagonal;
     for (var i=0; i<points.length-1; i++)
       {
            side=points[i].line2.side;
         	horizontal=(points[i].line2.linetype==1); // линия горизонтальная
            x_between=(Math.abs(x-points[i].left)<20); // х на горизонтальной линии
            y_ver=(y*side<=points[i].top*side)&&(y*side>=points[i+1].top*side); // у на отрезке
       	    vertical=(points[i].line2.linetype==2); // линия вертикальная
       	    x_hor=(x*side>=points[i].left*side)&&(x*side<=points[i+1].left*side); // х на отрезке
            y_between=(Math.abs(y-points[i].top)<20); // у на вертикальной линии
            diagonal=(points[i].line2.linetype==3); // линия диагональная

            if (horizontal&&x_hor&&y_between)
                 return points[i];
            if (vertical&&y_ver&&x_between)
                 return points[i];
            if (diagonal&&x_hor&&y_ver)
                 return points[i];

           }
        return null;
    }

     // Перед какой точкой попала точка
    function findBeforePoint(points,x,y)
      {
   // console.log(x+';'+y);
     var side, k, horizontal, x_between, y_ver, vertical, x_hor, y_between, diagonal, x_near_y;
     for (var i=1; i<points.length; i++)
       {
         // LINE 1 для всех (.) line: line.linetype==1 сущ. (.)k: point[k].line2==line или point[k].line3==line или point[k].line4==line

            k=points[i].line1.leftpoint;
            //if (k!=(i-1)) console.log('Начало цикла \n point'+i+':'+points[i].left+';'+points[i].top+', point'+k+':'+points[k].left+';'+points[k].top+'; направление'+side);

            side=points[i].line1.side;
          //  if (k!=(i-1)) side*=(-1);
         	horizontal=(points[i].line1.linetype==1); // линия горизонтальная
            x_between=(Math.abs(x-points[i].left)<20); // х на вертикальной линии
            y_ver=(y*side>=points[i].top*side)&&(y*side<=points[k].top*side); // у на отрезке

       	    vertical=(points[i].line1.linetype==2); // линия вертикальная
       	    x_hor=(x*side>=points[k].left*side)&&(x*side<=points[i].left*side); // х на отрезке
            y_between=(Math.abs(y-points[i].top)<20); // у на вертикальной линии
            diagonal=(points[i].line1.linetype==3); // линия диагональная
            var near=Math.abs(x+y-points[k].top-points[k].left);
            x_near_y=(near<20);

            if (horizontal&&x_hor&&y_between)
                 return points[i];

            if (vertical&&y_ver&&x_between)
                 return points[i];

            if (diagonal&&x_hor&&y_ver&&x_near_y)
                 return points[i];
              }


        return null;
    }


    // Нарисовать три линии и сделать первые две свойством третьей
    function goStraight(x1, x2, y1, y2)
     {
     //горизонтальная
       if ((Math.abs(x2-x1)>0)&&(Math.abs(y2-y1)==0))
         {
            var line=new fabric.Line([x1,y1-1.5*w,x2,y2-1.5*w],{originX: 'center', originY: 'center', stroke: '#018080', strokeWidth: w});      //самая светлая   #dfffff
            var line1=new fabric.Line([x1,y1,x2,y2],{originX: 'center', originY: 'center', stroke: '#5bd6d6' , strokeWidth: 2*w}); //светлая   #5bd6d6
            var line2=new fabric.Line([x1,y1,x2,y2],{stroke: 'rgba(255,0,0,0)', strokeWidth: 1});
            line.linetype=1;
           }
         // вертикальная
         if ((Math.abs(x2-x1)==0)&&(Math.abs(y2-y1)>0))
          {

             var line=new fabric.Line([x1-w,y1,x2-w,y2],{originX: 'center', originY: 'center', stroke: '#5bd6d6', strokeWidth: 2*w}); //тёмная    #018080
             var line1=new fabric.Line([x1+0.5*w,y1,x2+0.5*w,y2],{originX: 'center', originY: 'center', stroke: '#018080', strokeWidth: w});   //светлая   #5bd6d6
             var line2=new fabric.Line([x1,y1,x2,y2],{stroke: 'rgba(255,0,0,0)', strokeWidth: 1});
             line.linetype=2;
          }

        // диагональная
         if (Math.abs(x2-x1)==Math.abs(y2-y1))
           {

            var line=new fabric.Line([x1-w,y1-w,x2-w,y2-w],{originX: 'center', originY: 'center', stroke: '#5bd6d6', strokeWidth: w});  //самая светлая   #dfffff
            var line1=new fabric.Line([x1,y1,x2,y2],{originX: 'center', originY: 'center', stroke: '#018080', strokeWidth: 2*w});  //светлая
            var line2=new fabric.Line([x1,y1,x2,y2],{stroke: 'rgba(255,0,0,0)', strokeWidth: 1});
            line.linetype=3;
           }


         line.hasControls = line.hasBorders = line.selectable = false;
         line1.hasControls = line1.hasBorders = line1.selectable = false;
         line2.hasControls = line2.hasBorders = line2.selectable = false;
         line.name="line";
         line1.name="line";
         line2.name="line";
         line1.father="line";
         line2.father="line";
      //   var start=new fabric.Circle({originX:'center', originY:'center', radius: 4, left:x1, top: y1, fill: 'blue'});
      //   canvas.add (start);
      // зачем-то нарисовали синюю точку... ОК..
      //    start.hasControls=false;
         line.line1=line1;
         line.line2=line2;
      //   line.start=start;
         return line;

    }

    // Присобачить к точке point линии line1, line2, line3 и line4
    function joinPoint(points, id, lineleft, lineright, linetop, linedown)
    {
            points[id].line1=lineleft;
            points[id].line2=lineright;
            points[id].line3=linetop;
            points[id].line4=linedown;
            if (lineleft) lineleft.rightpoint=id;
            if (lineright) lineright.leftpoint=id;
            if (linetop) linetop.leftpoint=id;
            if (linedown) linedown.leftpoint=id;
            canvas.bringToFront(points[id]);
            return points;
            }

    // После вставки точки определить на какое место вставить newline к points[previd]
    function changeLine(points,i,k,newline)
    {
    	if(points[i].line2==points[k].line1)
    	   { points[i].line2=newline;

    	    }
    	if(points[i].line3==points[k].line1)
    	  { points[i].line3=newline;

    	    }
    	if(points[i].line4==points[k].line1)
    	 { points[i].line4=newline;
    	    }
    }

    // Вставить в массив points на место k точку с координатами CX CY
    function insertPoint(points, k, CX, CY)
    {
        var n=points.length;
        var newpoint, newline;
        var newx=CX;
        var newy=CY;

         // пересчитываем координаты, чтобы они оставались на линии

         if (points[k].line1.linetype===1)
             {
              newy=points[k].top;
             // console.log('NEWY====>',newy);
             // console.log('LINE.Y1=',points[k].line1.y1, 'LINE1.Y1=',points[k].line1.line1.y1);
              }
         else {
         	   if (points[k].line1.linetype===2)
                   {
                   	newx=points[k].left;
                   	}
              else
              {
               if (points[k].line1.linetype===3)
               {
                newy=points[k].top+points[k].line1.side*(Math.abs(CX-points[k].left));
                }
               }
               }

         var previd=points[k].line1.leftpoint;
         //  console.log ('В точке '+k+' leftpoint у line1 был '+previd);
         // ставим точку
         newpoint=putPoint(newx, newy);

         // я точки разведу ногами...
         points.splice(k,0,newpoint);
         canvas.add(newpoint);


        // От k до k+1
         if (points[k+1].line1.linetype==1)
		       {  //горизонтальная
		       points[k+1].line1.set({'x1':points[k].left, 'y1': points[k].top-1.5*w});
       	       points[k+1].line1.line1.set({ 'x1': points[k].left, 'y1': points[k].top});
		       points[k+1].line1.line2.set({ 'x1': points[k].left, 'y1': points[k].top });
		         }
	       if (points[k+1].line1.linetype==2)

	       {   //вертикальная
	         points[k+1].line1.set({'x1':points[k].left-w, 'y1': points[k].top});
	         points[k+1].line1.line1.set({ 'x1': points[k].left+0.5*w, 'y1': points[k].top });
	         points[k+1].line1.line2.set({ 'x1': points[k].left, 'y1': points[k].top });
	           }

	       if (points[k+1].line1.linetype==3)

	       {   //диагональная
	         points[k+1].line1.set({'x1':points[k].left-w, 'y1': points[k].top-w});
	         points[k+1].line1.line1.set({ 'x1': points[k].left, 'y1': points[k].top });
	         points[k+1].line1.line2.set({ 'x1': points[k].left, 'y1': points[k].top });
	           }

          points[k].line2=points[k+1].line1;
          points[k].line2.setCoords();

         // От previd до k
	         newline=goStraight(points[previd].left, points[k].left, points[previd].top, points[k].top);
	         canvas.add(newline, newline.line1, newline.line2);

	         newline.leftpoint=previd;
	         newline.rightpoint=k;
             points[k].line1=newline;
             changeLine(points,previd,k+1,newline);
             canvas.bringToFront(points[k]);

             points[k+1].line1.leftpoint=k;
             console.log('Ставим точку на место k='+k+'; leftpoint у line1 k+1 теперь равен '+points[k+1].line1.leftpoint);
             return points;
	  }

   // Проверяет в массиве ли
   function in_array(needle, haystack, strict)
    {
     var found = false, key, strict = !!strict;
     for (key in haystack) {
       if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }
    return found;

}

   // Строим путь от точки i до точки k
    function makePath(path, points, i, k, deadend)
     {
      // Проверяем линию 2
      if ((points[i].line2)&&(points[i].line2.rightpoint<=k)&&(!in_array(points[i].line2, deadend)))
         {
          path[path.length]=points[i].line2;

          // Если на конце линии искомая точка - возвращаем массив, иначе рекурсивно переходим к точке на конце линии
          if (points[i].line2.rightpoint==k) return path;
            else path=makePath(path, points, points[i].line2.rightpoint, k, deadend);
         }

      var n=path.length-1;
      if (n>0)
      {
      if (path[n].rightpoint!=k)
       { // Если не достигли результата, переходим к линии 3
       	if ((points[i].line3)&&(points[i].line3.rightpoint<=k)&&(!in_array(points[i].line3, deadend)))
         {
          path[path.length]=points[i].line3;
          if (points[i].line3.rightpoint==k) return path;
            else path=makePath(path, points, points[i].line3.rightpoint, k, deadend);
             }

           n=path.length-1;
           if (path[n].rightpoint!=k)
           { // Если не достигли результата, переходим к линии 4
	       	if ((points[i].line4)&&(points[i].line4.rightpoint<=k)&&(!in_array(points[i].line4, deadend)))
	         {
	          path[path.length]=points[i].line4;
	          if (points[i].line4.rightpoint==k) return path;
	            else path=makePath(path, points, points[i].line4.rightpoint, k, deadend);
	             }

             }

           }

        n=path.length-1;
        if ((n>0)&&(path[n].rightpoint!=k))
          { // Если мы все линии прошли, а результата не достигли - записываем линию в тупиковые и возвращаемся на шаг назад
        	deadend[deadend.length]=path.pop();
        	   }
        }

      return path;
     }

   //Поменять местами концы и направление линии

    function lineReverse(line)
     {
     	var x1=line.x1;
     	var x2=line.x2;
     	var y1=line.y1;
     	var y2=line.y2;
        var xx1=line.line1.x1;
     	var xx2=line.line1.x2;
     	var yy1=line.line1.y1;
     	var yy2=line.line1.y2;
        var xxx1=line.line2.x1;
     	var xxx2=line.line2.x2;
     	var yyy1=line.line2.y1;
     	var yyy2=line.line2.y2;

     	var leftpoint=line.leftpoint;
     	var rightpoint=line.rightpoint;

     	line.x1=x2;
     	line.x2=x1;
     	line.y1=y2;
     	line.y2=y1;
     	line.line1.x1=xx2;
     	line.line1.x2=xx1;
     	line.line1.y1=yy2;
     	line.line1.y2=yy1;
     	line.line2.x1=xxx2;
     	line.line2.x2=xxx1;
     	line.line2.y1=yyy2;
     	line.line2.y2=yyy1;

     	line.leftpoint=rightpoint;
     	line.rightpoint=leftpoint;

        line.setCoords();

     	return line;
     }


   // Нарисовать точку (от события click)
    function drawPoint(event)
     {
   // Вставить, чтобы отрезки были либо вертикальные (оставлять от точки только Y, а X - старый) - когда подсвечивается зелёным
   //                              либо горизонтальные (оставлять от точки только X, а Y - старый) - когда подсвечивается синим
   //                              либо диагональные... когда подсвечено красным...  то X=X2, Y=Y1-(X2-X1)


     var CX = event.offsetX==undefined?event.layerX:event.offsetX;  // x2
     var CY = event.offsetY==undefined?event.layerY:event.offsetY;  // y2
     console.log('CX: '+CX+'; CY:'+CY);
     if (CX==undefined)
        {
        	CX = event.touches[0].pageX;
        	console.log(event.touches[0]);
        	console.log(event.targetTouches[0]);
        	console.log(event.changedTouches[0]);
        	}
      if (CY==undefined) CY = event.touches[0].pageY;


     var newx=CX;
     var newy=CY;
     var n=points.length;
         console.log('Точка '+n+'  CX: '+CX+'; CY:'+CY);
        if (start>0)
        {
	       var x1=prevPoint.x;
	       var y1=prevPoint.y;

		   //  *(0,0)                Y
		   //                        |             Z
		   //                  1     | 1     2   /
		   //                        |         /
		   //                        |       /   2
		   //           6         y  |------------ *
		   //                        |   /         |
		   //                        | /           |    3
		   //   ---------------------*-------------------------X
		   //           6          / |x1,y1        x
		   //                    /   |
		   //                5 /     |                 3
		   //                /  5    |
		   //              /         |
		   //            /         4 |    4
		   //                        |
		   //                        |
		   //
		   //

		   var x=CX-x1;
		   var y=y1-CY;
           var vers=0;

		   // Где новая точка (x2,y2) по отношению к предыдущей (x1,y1)

		     if ((x>=0)&&(y>=0))
		       {
		       	if (y<=0.5*x)
		       	  vers=3;
		       	if ((y>0.5*x)&&(y<2*x))
		       	  vers=2;
		       	if (y>=2*x)
		       	  vers=1;

		       }


		     if ((x>=0)&&(y<0))
		        {
		        	if (Math.abs(y)<x)
		        	  vers=3;
		        	else
		        	  vers=4;
		        }


		     if ((x<0)&&(y<0))
		       {
		       	if (Math.abs(y)<0.5*Math.abs(x))
		       	    vers=6;
		       	if ((Math.abs(y)>=0.5*Math.abs(x))&&(Math.abs(y)<=2*Math.abs(x)))
		       	    vers=5;
		       	if (Math.abs(y)>2*Math.abs(x))
		       	   vers=4;
		       	}


		     if ((x<0)&&(y>=0))
		       {
		       	if (Math.abs(x)<y)
		        	  vers=1;
		        	else
		        	  vers=6;
		       }


		    // тип 1 и 4 - ось Y, тип 3 и 6 - ось X, тип 2 и 5 - ось Z


		     if ((vers==1)||(vers==4))
		        {
		         newx=x1;
		         newy=CY;
		        }

		     if ((vers==3)||(vers==6))
		        {
		         newx=CX;
		         newy=y1;
		        }

		      if ((vers==2)||(vers==5))
		         {

		        var d=0.5*Math.abs(x-y);
		        if (vers==2)
		          {
		          	if (Math.abs(CX-x1)>=Math.abs(CY-y1))
		          	  {
		          	  	newx=CX-d;
		          	  	newy=CY-d;
		          	  }
		          	 else
		          	   {
		          	   	newx=CX+d;
		          	   	newy=CY+d;
		          	   }

		           }

		        else
		          {
		          	if (Math.abs(CX-x1)>=Math.abs(CY-y1))
		          	  {
		          	  	newx=CX+d;
		          	  	newy=CY+d;
		          	  }
		          	 else
		          	   {
		          	   	newx=CX-d;
		          	   	newy=CY-d;
		          	   }
		          }


		         }

		     points[i]=putPoint(newx,newy);
		     points[i].id=i;


         // Все точки после первой
         lines[i-1]=goStraight(x1,newx,y1,newy);
         canvas.add(lines[i-1],lines[i-1].line1,lines[i-1].line2,points[i]);
         lines[i-1].leftpoint=prevPoint.k;
         points[i].id=i;
         points=joinPoint(points,i,lines[i-1],null,null,null);


         if (i>1) {
                   var prev=i-1;
                   if (prevPoint.k!=prev)
                   // Если предыдущая точка не предыдущая по номеру
                      {
                      	prev=prevPoint.k;
                      	// Если нет линии 1 или все линии заполнены - точка стоять не может
                      	if (points[prev].line2==null)
         	            // Нет линии 2
         	             {
         	               points=joinPoint(points,prev,points[prev].line1,lines[i-1],null,null);
         	               points[prev].line2.rightpoint=i;

         	                    }
         	            else
         	                {
         	               	if (points[prev].line3==null)
		         	    // Нет линии 3
		         	             {
		         	               points=joinPoint(points,prev,points[prev].line1,points[prev].line2,lines[i-1],null);
		         	               points[prev].line3.rightpoint=i;

		         	                    }
		         	            else
		         	            // Нет линии 4
		         	             {
		         	               points=joinPoint(points,prev,points[prev].line1,points[prev].line2,points[prev].line3,lines[i-1]);
                                   points[prev].line4.rightpoint=i;

		         	               }
         	                     }

         	        //    console.log('====> ANOTHER BRICK IN THE WALL');
         	        //    console.log('prev='+prev);
         	        //    console.log('Line1, Line2, Line3');
         	        //    console.log(points[prev].line1,points[prev].line2,points[prev].line3);
         	           /* if (((points[prev].line1.linetype==2)||(points[prev].line1.linetype==3))&&(points[prev].line3.linetype==1)&&(points[prev].line3.x1>points[prev].line3.x2))
         	               {
         	         //       console.log('====> STEP ASIDE'+points[prev].line3.x1+' - '+points[prev].line3.x2);
         	             	canvas.bringToFront(points[prev].line1);
         	              	canvas.bringToFront(points[prev].line1.line1);
         	              	canvas.bringToFront(points[prev].line2);
         	              	canvas.bringToFront(points[prev].line2.line1);
         	               	canvas.renderAll();
         	               }*/
         	           }
                  else
                   // Если предыдущая точка предыдущая по номеру и не нужно выёживаться
                   {
                   points=joinPoint(points,i-1,points[i-1].line1,lines[i-1],null,null);
         	     //  points[i-1].id=i-1;
         	        }

         	       }
         else {
                points[0].id=0;
                points[1].id=1;
         	    points=joinPoint(points,0,null,lines[0], null, null);
                points[0].line2.rightpoint='1';
                points[1].line1.rightpoint='1';
                          }
         prevPoint.x=newx;
         prevPoint.y=newy;
         prevPoint.k=i;
         i++;
         start++;

          }

        else
         {
            // Если цепочка уже существует
             if (n>0)
	         {  // Если мы попали в точку
	            /*  canvas.on('mouse:down', function(e) {
	                   if (e.target)
	                     {
	                     	if (e.target.name=="point")
	                     	   console.log('Мы попали в точку '+e.target.id);
	                     	if (e.target.name=="line")
	                     	   console.log('Мы попали в линию между точкой '+e.target.leftpoint+' и '+e.target.rightpoint);

	                     }
	                   });

	                   */
                // console.log(points);
	          i=n;
	          var p, newpoint, newline;
	          var k;
	          p=findPoint(points, CX, CY);
	          if (p)
	             {
	             	console.log('Попала в точку'+p.id);
	             	if ((points[p.id].line1!=null)&&((points[p.id].line2==null)||(points[p.id].line3==null)||(points[p.id].line4==null)))
	             	  {
	             	   prevPoint.x=points[p.id].left;
	             	   prevPoint.y=points[p.id].top;
	             	   prevPoint.k=p.id;
	             	   start++;
	             	  }
	                }
	          else
		          {

		            p=findBeforePoint(points,CX,CY);
				      if (p)
				        {
		                 k=p.id;
		                 points=insertPoint(points, k, CX, CY);
		                 prevPoint.x=points[k].left;
		                 prevPoint.y=points[k].top;
		                 prevPoint.k=k;
		                 console.log(points[k].line1, points[k].line2);
		                 if ((points[k].line1.linetype==2)||(points[k].line1.linetype==3))
		                  { console.log('====> K='+k);
		                  	console.log(points[k]);
		                    console.log('Another brick in the wall');
		                 //   console.log(points[k].line3.side);
		                    }
		                 i++;
		                 start++;
		                   	}

		              }

               }

             else
             {
            // Первая точка на панели
            points[i]=putPoint(newx,newy);

          	var xline=new fabric.Line([0, CY, 1000, CY], { stroke:	'rgba(0,0,255,0.3)' } );
          	var yline=new fabric.Line([CX, 0, CX, 1000], { stroke:	'rgba(0,255,0,0.3)' } );
          	var zline=new fabric.Line([CX-450, CY+450, CX+450, CY-450], { stroke:	'rgba(255,0,0,0.3)' } );

            xline.set('selectable', false);
          	yline.set('selectable', false);
            zline.set('selectable', false);
            canvas.add(xline, yline, zline, points[i]);
            console.log('первая точка на панели');
            points=joinPoint(points,i,null,null,null,null);
            prevPoint.x=newx;
            prevPoint.y=newy;
            prevPoint.k=0;

            start++;
            i++;

              }

           }

    }


    // Направляющие
    function drawLine(event)
    {
    	if (start>0)
    	  {
            var n=points.length;
    	    var CX = event.offsetX==undefined?event.layerX:event.offsetX;
            var CY = event.offsetY==undefined?event.layerY:event.offsetY;
           // if (!CX) CX = event.changedTouches[0].pageX;
           // if (!CY) CY = event.changedTouches[0].pageY;

            if (!CX) CX=0;
            if (!CY) CY=0;

   	        var X=prevPoint.x;
   	        var Y=prevPoint.y;
            var color='';

            if (Math.abs(CX-X)<Math.abs(CY-Y))
                color='rgba(0,255,0,0.3)';
                else  color='rgba(0,0,255,0.3)';
            if ((Math.abs(Math.abs(CX-X)-Math.abs(CY-Y))<75)&&((CX-X)*(CY-Y)<0))
                     color='rgba(255,0,0,0.3)';
            startLine.set({'x1': CX, 'y1': CY, 'x2': X, 'y2': Y, stroke: color });
            startLine.selectable=false;
            startLine.setCoords();
            canvas.renderAll();

              	  }


    }
     // После рисования добавить размеры к линиям
    function addSize(points,i)
    {

       if (points[i].line2!=null)
       {

          // длина горизонтального отрезка
       	if (points[i].line2.linetype==1)
       	  	{
       	  		 points[i].line2.size=points[i].line2.width;
                 if (points[points[i].line2.rightpoint].left>points[i].left) points[i].line2.side=1;
                 else points[i].line2.side=-1;
              }
         // длина вертикального отрезка
       	if (points[i].line2.linetype==2)
       	 {
       	     points[i].line2.size=points[i].line2.height+5;
       	     if (points[points[i].line2.rightpoint].top<points[i].top) points[i].line2.side=1;
             else points[i].line2.side=-1;
            }
        // длина диагонального отрезка
       	if (points[i].line2.linetype==3)
       	  	{
       	       points[i].line2.size=(points[i].line2.height+points[i].line2.width+5)/Math.sqrt(2);
               if (points[points[i].line2.rightpoint].left>points[i].left) points[i].line2.side=1;
               else points[i].line2.side=-1;
              }
     //  points[i].id=i;
      }

       if (points[i].line3!=null)
       {
          // длина горизонтального отрезка

       	if (points[i].line3.linetype==1)
       	  	{
       	  		points[i].line3.size=points[i].line3.width+5;;
                if (points[points[i].line3.rightpoint].left>points[i].left) points[i].line3.side=1;
                else points[i].line3.side=-1;
              }
         // длина вертикального отрезка
       	if (points[i].line3.linetype==2)
       	 {
       	     points[i].line3.size=points[i].line3.height+5;;
             if (points[points[i].line3.rightpoint].top<points[i].top) points[i].line3.side=1;
               else points[i].line3.side=-1;
            }
        // длина диагонального отрезка
       	if (points[i].line3.linetype==3)
       	  	{
       	  	   points[i].line3.size=(points[i].line3.height+points[i].line3.width+5)/Math.sqrt(2);;
               if (points[points[i].line3.rightpoint].left>points[i].left) points[i].line3.side=1;
                 else points[i].line3.side=-1;
              }
       points[i].id=i;
      }

       if (points[i].line4!=null)
       {

          // длина горизонтального отрезка
       	if (points[i].line4.linetype==1)
       	  	{
       	  		points[i].line4.size=points[i].line4.width+5;
                if (points[points[i].line4.rightpoint].left>points[i].left)
                     points[i].line4.side=1;
                 else points[i].line4.side=-1;
              }
         // длина вертикального отрезка
       	if (points[i].line4.linetype==2)
       	 {
       	 	 points[i].line4.size=points[i].line4.height+5;
             if (points[points[i].line4.rightpoint].top<points[i].top)
                 points[i].line4.side=1;
               else points[i].line4.side=-1;
            }
        // длина диагонального отрезка
       	if (points[i].line4.linetype==3)
       	  	{
       	  	   points[i].line4.size=(points[i].line4.height+points[i].line4.width+5)/Math.sqrt(2);;
               if (points[points[i].line4.rightpoint].left>points[i].left)
                    points[i].line4.side=1;
                 else points[i].line4.side=-1;
              }
     }


     points[i].id=i;
     if (points[i].line1) points[i].line1.rightpoint=i;
     if (points[i].line2) points[i].line2.leftpoint=i;
     if (points[i].line3) points[i].line3.leftpoint=i;
     if (points[i].line4) points[i].line4.leftpoint=i;

     return points[i];

    }

   // Закончить рисовать непрерывную цепочку
    function stopLine(event)
    {
    // Говорим, что мы закончили чертить линию

    	start=0;

    //  Убираем последнюю точку, которая досталась в наследство от dblclick
        var n=points.length;
        canvas.remove(points[n-1]);
        canvas.remove(points[n-1].line1);
        canvas.remove(points[n-1].line1.line1);
        canvas.remove(points[n-1].line1.line2);
        points[n-2].line2=null;
        points.pop();
        console.log(points);
    //  Добавляем длины ко всем отрезкам

        for (var i=0; i<n-1; i++)
          {
            points[i]=addSize(points,i);
//            points[i].stroke='rgba(0,0,0,0)';
//            points[i].fill='rgba(0,0,0,0)';
            canvas.bringToFront(points[i]);
            }

    }

   // Скорректировать координаты линий после изменения геометрии, используется в changePoint
    function fixPoint (p)
    {
   // plines=[p.line1, p.line2, p.line3, p.line4];
   // console.log('====>>>> PLINES >>>>'+plines[0].x2+plines[1].x2+plines[2]+plines[3]);
   //Line 1 - предыдущая линия (приходит в точку)
    if (p.line1)
     {
       if (p.line1.linetype==1)   // горизонтальная
         {
         	p.line1.set({ 'x2': p.left, 'y2': p.line1.y1});
            p.line1.line1.set({ 'x2': p.left, 'y2': p.top });
           }

        if (p.line1.linetype==2)     // вертикальная

         {
              p.line1.set({ 'x2': p.line1.x1, 'y2': p.top }); //+p.line1.side*4
              p.line1.line1.set({ 'x2': p.left+0.5*w, 'y2': p.top});
            }

        if (p.line1.linetype==3)     // диагональная

         {
             p.line1.set({ 'x2': p.left-w, 'y2': p.top-w });
             p.line1.line1.set({ 'x2': p.left, 'y2': p.top});
             }
     /*
      p.line1.set({ 'x2': p.left, 'y2': p.top });
      p.line1.line1.set({ 'x2': p.left, 'y2': p.top });      */
      p.line1.line2.set({ 'x2': p.left, 'y2': p.top });  // вспомогательная линия, обычно прозрачная
      p.line1.setCoords();
   //   p.line1.line1.setCoords();
   //   p.line1.line2.setCoords();
       }
    //Line2 - исходящая линия
   if (p.line2)

     {  if (p.line2.leftpoint==p.id)
	     { if (p.line2.linetype==1)    //горизонтальная
	         {
	            p.line2.set({ 'x1': p.left, 'y1': p.top-1.5*w});
	            p.line2.line1.set({ 'x1': p.left, 'y1': p.top });

	           }
	        if (p.line2.linetype==2)   //вертикальная
	         {
	          p.line2.set({ 'x1': p.left-w, 'y1': p.top});
              p.line2.line1.set({ 'x1': p.left+0.5*w, 'y1': p.top});
	             }
            if (p.line2.linetype==3)   //диагональная
	         {
	          p.line2.set({ 'x1': p.left-w, 'y1': p.top-w });
              p.line2.line1.set({ 'x1': p.left, 'y1': p.top});
	             }

          /*   p.line2.set({ 'x1': p.left, 'y1': p.top });
            p.line2.line1.set({ 'x1': p.left, 'y1': p.top });     */
            p.line2.line2.set({ 'x1': p.left, 'y1': p.top });  // вспомогательная линия, обычно прозрачная
	             }
        else
        {
        if (p.line2.linetype==1)
         {
         p.line2.set({ 'x2': p.left, 'y2': p.top-1.5*w});
         p.line2.line1.set({ 'x2': p.left, 'y2': p.top });

          }
        if (p.line2.linetype==2)
         {
         p.line2.set({ 'x2': p.left-w, 'y2': p.top});
         p.line2.line1.set({ 'x2': p.left+0.5*w, 'y2': p.top });

          }
         if (p.line2.linetype==3)
         {
         p.line2.set({ 'x2': p.left+w, 'y2': p.top+w });
         p.line2.line1.set({ 'x2': p.left, 'y2': p.top });
          }
       /*   p.line2.set({ 'x2': p.left, 'y2': p.top});
        p.line2.line1.set({ 'x2': p.left, 'y2': p.top});  */
        p.line2.line2.set({ 'x2': p.left, 'y2': p.top});   // вспомогательная линия, обычно прозрачная
        }

       p.line2.setCoords();

       }

  if (p.line3)
     {

      if(p.line3.leftpoint==p.id)
      {
        {  if (p.line3.linetype==1)
	       {
	            p.line3.set({ 'x1': p.left, 'y1': p.top });
	            p.line3.line1.set({ 'x1': p.left, 'y1': p.top });
	           }
	        if (p.line3.linetype==2)
	         {
	          p.line3.set({ 'x1': p.left, 'y1': p.top});
              p.line3.line1.set({ 'x1': p.left, 'y1': p.top});
	             }
            if (p.line3.linetype==3)
	         {
	          p.line3.set({ 'x1': p.left, 'y1': p.top });
              p.line3.line1.set({ 'x1': p.left, 'y1': p.top});
	             }
          /*    p.line3.set({ 'x1': p.left, 'y1': p.top});
            p.line3.line1.set({ 'x1': p.left, 'y1': p.top}); */
            p.line3.line2.set({ 'x1': p.left, 'y1': p.top});   // вспомогательная линия, обычно прозрачная

	        }
         }
       else
       {
         if (p.line3.linetype==1)
         {
         p.line3.set({ 'x2': p.left, 'y2': p.top});
         p.line3.line1.set({ 'x2': p.left, 'y2': p.top });
          }
        if (p.line3.linetype==2)
         {
         p.line3.set({ 'x2': p.left, 'y2': p.top});
         p.line3.line1.set({ 'x2': p.left, 'y2': p.top });
          }
         if (p.line3.linetype==3)
         {
         p.line3.set({ 'x2': p.left, 'y2': p.top });
         p.line3.line1.set({ 'x2': p.left, 'y2': p.top });
          }
       /* p.line3.set({ 'x2': p.left, 'y2': p.top });
        p.line3.line1.set({ 'x2': p.left, 'y2': p.top }); */
        p.line3.line2.set({ 'x2': p.left, 'y2': p.top });  // вспомогательная линия, обычно прозрачная
        }
      p.line3.setCoords();
      }

     if (p.line4)

       {

      if(p.line4.leftpoint==p.id)
      {
        {  if (p.line4.linetype==1)
	         {
	            p.line4.set({ 'x1': p.left, 'y1': p.top});
	            p.line4.line1.set({ 'x1': p.left, 'y1': p.top });
	           }
	        if (p.line4.linetype==2)
	         {
	          p.line4.set({ 'x1': p.left, 'y1': p.top});
              p.line4.line1.set({ 'x1': p.left, 'y1': p.top});
	             }
            if (p.line4.linetype==3)
	         {
	          p.line4.set({ 'x1': p.left, 'y1': p.top });
              p.line4.line1.set({ 'x1': p.left, 'y1': p.top});
	             }
            /*
            p.line4.set({ 'x1': p.left, 'y1': p.top });
            p.line4.line1.set({ 'x1': p.left, 'y1': p.top });    */
	        p.line4.line2.set({ 'x1': p.left, 'y1': p.top });  // вспомогательная линия, обычно прозрачная

	        }
         }
       else
       {
         if (p.line4.linetype==1)
         {
         p.line4.set({ 'x2': p.left, 'y2': p.top});
         p.line4.line1.set({ 'x2': p.left, 'y2': p.top });
          }
        if (p.line4.linetype==2)
         {
         p.line4.set({ 'x2': p.left, 'y2': p.top});
         p.line4.line1.set({ 'x2': p.left, 'y2': p.top });
          }
         if (p.line4.linetype==3)
         {
         p.line4.set({ 'x2': p.left, 'y2': p.top});
         p.line4.line1.set({ 'x2': p.left, 'y2': p.top });
          }
          p.line4.set({ 'x2': p.left, 'y2': p.top});
          p.line4.line1.set({ 'x2': p.left, 'y2': p.top});
          p.line4.line2.set({ 'x2': p.left, 'y2': p.top});
          }

         p.line4.setCoords();
       }


     return p;
     }


  // Поставить у точки координаты x2, y2 - внутренняя функция для функции reorder
    function changePoint(point,x2,y2)
     {
        point.left=x2;
        point.top=y2;
        point.x=x2;
        point.y=y2;

       if (point.text)
       {
         point.text.left=point.left+10;
         point.text.top=point.top;
         point.text.setCoords();
         }

        point.selectable=true;
        point=fixPoint(point);

        canvas.bringToFront(point);
        canvas.setActiveObject(point);

        point.setCoords();
        canvas.renderAll();

        point=fixPoint(point);

        return point;
     }


    // Сдвинуть точку i на delta (тип сдвижки - type) Внутренняя функция для режима редактирования
    function reorder(points, i, type, delta)
     {
      console.log ('Точка '+i+', тип сдвижки '+type+', расстояние '+delta);
       // Сдвиг по горизонтали
        if (type==1)
      {
      	if ((points[i].line2)&&(points[i].line2.leftpoint==i)&&(points[i].line2===points[points[i].line2.rightpoint].line1))
      	  { console.log('Обрабатываю line2');
      	  	x2=points[points[i].line2.rightpoint].left+delta;
      	  	y2=points[points[i].line2.rightpoint].top;
      	    points[points[i].line2.rightpoint]=changePoint(points[points[i].line2.rightpoint],x2,y2);
            points=reorder(points,points[i].line2.rightpoint,type,delta);
      	      	  }

      	if ((points[i].line3)&&(points[i].line3.leftpoint==i)&&(points[i].line3===points[points[i].line3.rightpoint].line1))
      	  { console.log('Обрабатываю line3');
      	  	x2=points[points[i].line3.rightpoint].left+delta;
      	  	y2=points[points[i].line3.rightpoint].top;
      	    points[points[i].line3.rightpoint]=changePoint(points[points[i].line3.rightpoint],x2,y2);
            points=reorder(points,points[i].line3.rightpoint,type,delta);
      	      	  }

        if ((points[i].line4)&&(points[i].line4.leftpoint==i)&&(points[i].line4===points[points[i].line4.rightpoint].line1))

      	  { console.log('Обрабатываю line4');
      	  	x2=points[points[i].line4.rightpoint].left+delta;
      	  	y2=points[points[i].line4.rightpoint].top;
      	    points[points[i].line4.rightpoint]=changePoint(points[points[i].line4.rightpoint],x2,y2);
            points=reorder(points,points[i].line4.rightpoint,type,delta);
      	      	  }

      }
       // Сдвиг по вертикали
        if (type==2)
      {  console.log ('Точка '+i+', тип сдвижки '+type+', расстояние '+delta);

         if ((points[i].line2)&&(points[i].line2.leftpoint==i)&&(points[i].line2===points[points[i].line2.rightpoint].line1))
      		  {   console.log('Обрабатываю line2');
      	  	x2=points[points[i].line2.rightpoint].left;
      	  	y2=points[points[i].line2.rightpoint].top+delta;
      	    points[points[i].line2.rightpoint]=changePoint(points[points[i].line2.rightpoint],x2,y2);
            points=reorder(points,points[i].line2.rightpoint,type,delta);
      	      	  }
         if ((points[i].line3)&&(points[i].line3.leftpoint==i)&&(points[i].line3===points[points[i].line3.rightpoint].line1))
      	    {   console.log('Обрабатываю line3');
      	  	x2=points[points[i].line3.rightpoint].left;
      	  	y2=points[points[i].line3.rightpoint].top+delta;
      	    points[points[i].line3.rightpoint]=changePoint(points[points[i].line3.rightpoint],x2,y2);
            points=reorder(points,points[i].line3.rightpoint,type,delta);
      	      	  }
        if ((points[i].line4)&&(points[i].line4.leftpoint==i)&&(points[i].line4===points[points[i].line4.rightpoint].line1))
      	   {       console.log('Обрабатываю line4');
      	  	x2=points[points[i].line4.rightpoint].left;
      	  	y2=points[points[i].line4.rightpoint].top+delta;
      	    points[points[i].line4.rightpoint]=changePoint(points[points[i].line4.rightpoint],x2,y2);
            points=reorder(points,points[i].line4.rightpoint,type,delta);
      	      	  }

      }


       // Сдвиг по диагонали
        if (type==3)
      {
      	if ((points[i].line2)&&(points[i].line2.leftpoint==i)&&(points[i].line2===points[points[i].line2.rightpoint].line1))
      	  {
      	  	x2=points[points[i].line2.rightpoint].left+delta;
      	  	y2=points[points[i].line2.rightpoint].top-delta;
      	    points[points[i].line2.rightpoint]=changePoint(points[points[i].line2.rightpoint],x2,y2);
            points=reorder(points,points[i].line2.rightpoint,type,delta);
      	      	  }
      	if ((points[i].line3)&&(points[i].line3.leftpoint==i)&&(points[i].line3===points[points[i].line3.rightpoint].line1))
      	    {
      	  	x2=points[points[i].line3.rightpoint].left+delta;
      	  	y2=points[points[i].line3.rightpoint].top-delta;
      	    points[points[i].line3.rightpoint]=changePoint(points[points[i].line3.rightpoint],x2,y2);
            points=reorder(points,points[i].line3.rightpoint,type,delta);
      	      	  }
       if ((points[i].line4)&&(points[i].line4.leftpoint==i)&&(points[i].line4===points[points[i].line4.rightpoint].line1))
      	   {
      	  	x2=points[points[i].line4.rightpoint].left+delta;
      	  	y2=points[points[i].line4.rightpoint].top-delta;
      	    points[points[i].line4.rightpoint]=changePoint(points[points[i].line4.rightpoint],x2,y2);
            points=reorder(points,points[i].line4.rightpoint,type,delta);
      	      	  }

      }

       if (points[0].line2.rulertext) points=reCheckSizes(points);

       return points;
      }

     /////////////////////////////////////////////////////////
    //                                                     //
   //    Р Е Д А К Т И Р О В А Н И Е   Г Е О М Е Т Р И И  //
  //                                                     //
 /////////////////////////////////////////////////////////

    function Editing ()
     {
      cur=0;
      pushButton('edit', 'draw', 'erase', 'ruler', 'countPieces', 'savePicture')
      document.getElementById('hint_top').style.display='block';
      document.getElementById('hint_top').innerHTML='Режим редактирования шинопровода. Двигайте мышкой вершины шинопровода вдоль направления рёбер';

      canvas.defaultCursor='default';
    //  console.log (fabric.isTouchSupported);
      var text;
      var strokes=new Array();
      var n=points.length;

       for (i = 0; i < n; i++)
        {
        	points[i].set('selectable',true);
        	points[i].set('stroke','#000');
        	points[i].set('fill','#336666');

        //	console.log(points[i]);
        	canvas.bringToFront(points[i]);

        	if (!points[i].text)
        	 {
        	  text=new fabric.Text('№ '+i, {left: points[i].left+10, top: points[i].top, fontSize: 14, fontFamily: 'Century Gothic'});
              points[i].text=text;
        	  points[i].text.selectable=false;
        	   }
        	canvas.add(points[i].text);

        }
        canvas.renderAll();
      console.log(points);

      place.removeEventListener('click', drawPoint);
      place.removeEventListener('mousemove', drawLine);
      place.removeEventListener('dblclick', stopLine);
      place.removeEventListener('click', showPoint);
      place.removeEventListener('dblclick', delPoint);
      place.removeEventListener('click',rulerSet,false);
      place.removeEventListener('touchend', drawPoint,false);


      canvas.renderAll();

		    canvas.on('object:moving', function(e) {

		    var p = e.target;
		    var x2;
		    var y2;
		    var type;

            console.log ('Двигаемая точка: '+p.id+'; left='+p.left+'; x='+p.x+'; top='+p.top+'; y='+p.y);


		    if (p.line1) type=p.line1.linetype;
		    else type=p.line2.linetype;

		    if (type==1)
		      {
		      	x2=p.left;
		      	y2=p.y;
		      	delta=p.left-points[p.id].x;
		      	p.line1.size=p.line1.size+delta;
		      }
		    if (type==2)
		      {
		      	x2=p.x;
		      	y2=p.top;
		      	delta=p.top-points[p.id].y;
		      	p.line1.size=p.line1.size+delta;
		      }
		    if (type==3)
		      {
		      	x2=p.left;
		       	y2=p.y-p.left+p.x;
		       	delta=p.left-points[p.id].x;
		       	p.line1.size=p.line1.size+delta*Math.sqrt(2);
		       }

		     //p.left=x2;
		     //p.top=y2;
		     p=changePoint(p,x2,y2);
             p=addSize(points,p.id);

             points=reorder(points, p.id, type, delta);
             if (p.line1.sm)
               {
                 if (p.id!==1)
                   var dm=points[1].line1.sm/points[1].line1.size;
                   else
                     var dm=points[2].line1.sm/points[2].line1.size;
                 console.log ('Установленная пропорция мм/пиксели='+dm+'Был размер в мм='+p.line1.sm);
                 p.line1.sm=p.line1.size*dm
                 console.log ('стал размер в мм='+p.line1.sm+'; потому что size='+p.line1.size);


                  p.line1.rulertext.text=p.line1.sm.toFixed(0)+'мм.';
                  canvas.renderAll();
               	  points=reCheckSizes(points);
                 }

		     canvas.renderAll();
    });

            canvas.on('touch:drag', function(e) {
            console.log('Кто-то лапает точку'+e.changedTouches[0].target.id);
		    var p = e.changedTouches[0].target;
		    var x2;
		    var y2;
		    var type;

		    if (p.line1) type=p.line1.linetype;
		    else type=p.line2.linetype;

		    if (type==1)
		      {
		      	x2=p.left;
		      	y2=p.y;
		      	delta=p.left-points[p.id].x;
		      	p.line1.size=p.line1.size+delta;
		      }
		    if (type==2)
		      {
		      	x2=p.x;
		      	y2=p.top;
		      	delta=p.top-points[p.id].y;
		      	p.line1.size=p.line1.size+delta;
		      }
		    if (type==3)
		      {
		      	x2=p.left;
		       	y2=p.y-p.left+p.x;
		       	delta=p.left-points[p.id].x;
		       	p.line1.size=p.line1.size+delta*Math.sqrt(2);
		       }

		     //p.left=x2;
		     //p.top=y2;
		     p=changePoint(p,x2,y2);
             p=addSize(points,p.id);

             points=reorder(points, p.id, type, delta);
             if (p.line1.sm)
               {
                 if (p.id!==1)
                   var dm=points[1].line1.sm/points[1].line1.size;
                   else
                     var dm=points[2].line1.sm/points[2].line1.size;
                 console.log ('Установленная пропорция мм/пиксели='+dm+'Был размер в мм='+p.line1.sm);
                 p.line1.sm=p.line1.size*dm
                 console.log ('стал размер в мм='+p.line1.sm+'; потому что size='+p.line1.size);


                  p.line1.rulertext.text=p.line1.sm.toFixed(0)+'мм.';
                  canvas.renderAll();
               	  points=reCheckSizes(points);
                 }

		     canvas.renderAll();
    });


       }


     /////////////////////////////////////////////////////////
    //                                                     //
   //          Р И С О В А Н И Е  Т О Ч Е К               //
  //                                                     //
 /////////////////////////////////////////////////////////
  function Drawing ()
     {
      w=document.getElementById('shino-width').style.width;
      w=Number.parseInt(w);
      console.log(w);


     for (var i=0; i<points.length; i++)
     {
     	points[i].set('fill','#fff');
     	points[i].set('stroke','333');
     	if (points[i].text) canvas.remove(points[i].text);
     	points[i].selectable=false;
     }
     canvas.renderAll();
     pushButton('draw', 'edit', 'erase', 'ruler', 'countPieces', 'savePicture');
     document.getElementById('hint_top').style.display='block';
     document.getElementById('hint_top').innerHTML='Режим рисования шинопровода. Один клик - поставить точку, двойной клик - закончить линию. Линию можно продолжить от вершины или от ребра.';
     canvas.defaultCursor='crosshair';
     place.addEventListener('click', drawPoint, false);
     place.addEventListener('mousemove', drawLine, false);
     place.addEventListener('dblclick', stopLine, false);
  //   place.addEventListener('touchstart', drawPoint,false);
     place.addEventListener('touchend', drawPoint,false);
     place.removeEventListener('click', showPoint, false);
     place.removeEventListener('dblclick', delPoint, false);
     place.removeEventListener('click',rulerSet,false);

       }





    // Показывает какие точки будут удалены

    function showHint(points,i)
     {
     	if ((points[i].line2)&&(points[i].line2.leftpoint==i)&&(points[i].line2===points[points[i].line2.rightpoint].line1))
      	  { points[points[i].line2.rightpoint].set('fill','#FF0000');
      	    points[points[i].line2.rightpoint].set('stroke','#000');
            points=showHint(points,points[i].line2.rightpoint);
      	      	  }
        if ((points[i].line3)&&(points[i].line3.leftpoint==i)&&(points[i].line3===points[points[i].line3.rightpoint].line1))
      	  { points[points[i].line3.rightpoint].set('fill','#FF0000');
      	    points[points[i].line3.rightpoint].set('stroke','#000');
            points=showHint(points,points[i].line3.rightpoint);
      	      	  }
      	if ((points[i].line4)&&(points[i].line4.leftpoint==i)&&(points[i].line4===points[points[i].line4.rightpoint].line1))
      		  { points[points[i].line4.rightpoint].set('fill','#FF0000');
      		    points[points[i].line4.rightpoint].set('stroke','#000');
                points=showHint(points,points[i].line4.rightpoint);
      	      	  }
        if ((!points[i].line2)&&(!points[i].line3)&&(!points[i].line4)) console.log('могу удалить точку '+i);
        canvas.renderAll();
       return points;
      }


   // Убирает подсказку
    function clearHint(points)
     {
     	for (var i=0; i<points.length; i++)
     	{
     		points[i].set('fill','white');
     		points[i].set('stroke','black');
     	   	if (points[i].text) canvas.remove(points[i].text);
       		//canvas.bringToFront(points[i]);
     		points[i].selectable=false;
     	}
     	return points;
     }

    // "Освежить" данные leftpoint и rightpoint линий, выходящих из точек
    function refresh(points)
    {
    	for (var i=0; i<points.length; i++)
    	{
    		 points[i].id=i;
             if (points[i].line1) points[i].line1.rightpoint=i;
             if (points[i].line2) points[i].line2.leftpoint=i;
             if (points[i].line3) points[i].line3.leftpoint=i;
             if (points[i].line4) points[i].line4.leftpoint=i;
    	}
    	return points;
    }

    // Удалить от корня i
    function deleteRoot(points, i)
    {    console.log('Удаляю ветку от точки '+i);
         if ((points[i].line2)&&(points[i].line2.leftpoint==i)&&(points[i].line2===points[points[i].line2.rightpoint].line1))
      	  { points=deleteRoot(points,points[i].line2.rightpoint);
      	      	  }

        if ((points[i].line3)&&(points[i].line3.leftpoint==i)&&(points[i].line3===points[points[i].line3.rightpoint].line1))
      	  {
            points=deleteRoot(points,points[i].line3.rightpoint);
      	      	  }
      	if ((points[i].line4)&&(points[i].line4.leftpoint==i)&&(points[i].line4===points[points[i].line4.rightpoint].line1))
      		  {
                points=deleteRoot(points,points[i].line4.rightpoint);
      	      	  }
        if ((!points[i].line2)&&(!points[i].line3)&&(!points[i].line4))
        {
        	console.log('могу удалить точку '+i);
        	canvas.remove(points[i],points[i].line1,points[i].line1.line1,points[i].line1.line2);
        	if (points[i].line1.rulertext) canvas.remove (points[i].line1.rulertext);
        	if (points[i].text) canvas.remove(points[i].text);
            if ((points[points[i].line1.leftpoint].line2)&&(points[points[i].line1.leftpoint].line2.rightpoint==i))
              {
              	 points[points[i].line1.leftpoint].line2=null;
              	 console.log('Занулили line2 у точки '+points[i].line1.leftpoint);
              	 points.splice(i,1);
              	 points=refresh(points);
              	 return points;
              	 }

           if ((points[points[i].line1.leftpoint].line3)&&(points[points[i].line1.leftpoint].line3.rightpoint==i))
                {
              	 points[points[i].line1.leftpoint].line3=null;
              	 console.log('Занулили line3 у точки '+points[i].line1.leftpoint);
              	 points.splice(i,1);
              	 points=refresh(points);
              	 return points;
              	 }

          if ((points[points[i].line1.leftpoint].line4)&&(points[points[i].line1.leftpoint].line4.rightpoint==i))
                 {
              	 points[points[i].line1.leftpoint].line4=null;
               	 console.log('Занулили line4 у точки '+points[i].line1.leftpoint);
               	 points.splice(i,1);
              	 points=refresh(points);
              	 return points;
              	 }
          }
        return points;
    }



   // Удалить точку, на которую кликнули
    function delPoint(event)
    {
      console.log('dblclick detected');
      var CX = event.offsetX==undefined?event.layerX:event.offsetX;  // x2
      var CY = event.offsetY==undefined?event.layerY:event.offsetY;  // y2
      var p=findPoint(points,CX,CY);
      if(p)
        {   var k=1;
        	while ((p.line2)||(p.line3)||(p.line4))
        	{  console.log ('круг '+k);
        	   k++;
        	   if (p.line2) console.log('есть line2');
        	   if (p.line3) console.log('есть line3');
        	   if (p.line4) console.log('есть line4');
        	   points=deleteRoot(points,p.id);

        	   }
            if(points[p.id])
             {
            console.log('осталась точка '+p.id+' - удаляю');

        	canvas.remove(p,p.line1,p.line1.line1,p.line1.line2);
        	if (p.line1.rulertext)
        	  	{
        		canvas.remove (p.line1.rulertext);
        	    canvas.remove (p.line1.rulertext.rulerLine);
        	    canvas.remove (p.line1.rulertext.rulerLeftArrow);
        	    canvas.remove (p.line1.rulertext.rulerRightArrow);
        	        }
        	if (p.text) canvas.remove(p.text);
            if ((points[p.line1.leftpoint].line2)&&(points[p.line1.leftpoint].line2.rightpoint==p.id)) points[p.line1.leftpoint].line2=null;

            	 if ((points[p.line1.leftpoint].line3)&&(points[p.line1.leftpoint].line3.rightpoint==p.id)) points[p.line1.leftpoint].line3=null;

                 else
                    if ((points[p.line1.leftpoint].line4)&&(points[p.line1.leftpoint].line4.rightpoint==p.id)) points[p.line1.leftpoint].line4=null;
          	      }
          	points.splice(p.id,1);
            points=refresh(points);
            }

    }

  // Подстветить красным точки, которые будут удалены
    function showPoint(event)
    { //console.log('entered showPoint');
      var CX = event.offsetX==undefined?event.layerX:event.offsetX;  // x2
      var CY = event.offsetY==undefined?event.layerY:event.offsetY;  // y2
      var p=findPoint(points,CX,CY);
      if(p)
        {
           p.set('fill','#FF0000');
           p.set('stroke','#FFF');
           canvas.bringToFront(p);
           console.log('Клик на точку '+p.id+' - Красные точки будут удалены');
           points=showHint(points,p.id);
           canvas.renderAll();

             }
        else
        { points=clearHint(points);
          console.log('Выбор сброшен');
          }
    }

    function Erasing()
      {
        points=clearHint(points);


        pushButton('erase', 'edit', 'draw', 'ruler', 'countPieces', 'savePicture');
        document.getElementById('hint_top').style.display='block';
        document.getElementById('hint_top').innerHTML='Режим удаления точек шинопровода. Один клик - посмотреть какие точку будут удалены. Двойной клик - удалить.';

      	canvas.defaultCursor='default';
	    place.removeEventListener('click', drawPoint);
	    place.removeEventListener('mousemove', drawLine);
	    place.removeEventListener('dblclick', stopLine);
	    place.removeEventListener('click',rulerSet);
        place.removeEventListener('click',rulerSet,false);

        place.addEventListener('click', showPoint, false);
        place.addEventListener('dblclick', delPoint, false);


      }

    function lineSize(line,size,sm)
     {
     	var linesize=(sm*line.size)/size;
     	return linesize;
     }


   // определяет для отрезка line координаты надписи с длиной отрезка (которые красные) (x,y), начала и конца линейки (x1, y1, x4, y4) и углов стрелок (x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6)
    function defineXY (line)
     {
      var coords={'x':0,
                  'y':0,
                  'x1':0,
                  'x2':0,
                  'x3':0,
                  'x4':0,
                  'x5':0,
                  'x6':0,
                  'y1':0,
                  'y2':0,
                  'y3':0,
                  'y4':0,
                  'y5':0,
                  'y6':0};
      if (line.linetype==1)
        {

         // x1, y1, x4, y4 - для линеек, (x1,y1) (x2,y2) (x3,y3) - координаты первой стрелки, (х4, у4) (х5,у5) (х6,у6) - координаты второй стрелки
         coords.x=line.x1+(line.x2-line.x1)/2-30;
         coords.y=line.y1-30;
         coords.x1=line.x1+line.side*10;
         coords.y1=line.y1-10;

         coords.x2=coords.x1+5*line.side;
         coords.y2=coords.y1-5;

         coords.x3=coords.x1+5*line.side;
         coords.y3=coords.y1+5;

         coords.x4=line.x2-line.side*15;
         coords.y4=line.y2-10;

         coords.x5=coords.x4-5*line.side;
         coords.y5=coords.y4-5;

         coords.x6=coords.x4-5*line.side;
         coords.y6=coords.y4+5;
        }

     if (line.linetype==2)
        {
         coords.y=line.y1+(line.y2-line.y1)/2;
         coords.x=line.x1-80;

         coords.x1=line.x1-10;
         coords.y1=line.y1-15*line.side;

         coords.x2=coords.x1-5;
         coords.y2=coords.y1-5*line.side;

         coords.x3=coords.x1+5;
         coords.y3=coords.y1-5*line.side;

         coords.x4=line.x2-10;
         coords.y4=line.y2+10*line.side;

         coords.x5=coords.x4-5;
         coords.y5=coords.y4+5*line.side;

         coords.x6=coords.x4+5;
         coords.y6=coords.y4+5*line.side;
        }

     if (line.linetype==3)
        {
         coords.x=line.x1+(line.x2-line.x1)/2-100;
         coords.y=line.y1+(line.y2-line.y1)/2;

         coords.x1=line.x1-17.5+7.5*line.side;
         coords.y1=line.y1-10*line.side;

         coords.x2=coords.x1;
         coords.y2=coords.y1-10*line.side;

         coords.x3=coords.x1+10*line.side;
         coords.y3=coords.y1;

         coords.x4=line.x2-17.5-7.5*line.side;
         coords.y4=line.y2+10*line.side;

         coords.x5=coords.x4;
         coords.y5=coords.y4+10*line.side;

         coords.x6=coords.x4-10*line.side;
         coords.y6=coords.y4;
        }
        return coords;
     }

   // определяет размеры для всех остальных отрезков массива points. delta - пропорция между реальным размером в пикселях и указанным размером в мм.
    function checkSizes(points,delta)
      {
        var rulertext;
        var coords={'x':0,
                    'y':0};
     	for (var i=1; i<points.length; i++)
     	{
     		if (!points[i].line1.sm)
     		   {
                points[i].line1.sm=delta*points[i].line1.size;
                coords=defineXY(points[i].line1);
        	 	var rulerLine=new fabric.Line ([coords.x1,coords.y1,coords.x4,coords.y4], {stroke: '#FF0000', strokeWidth: 1});
        	 	var rulerLeftArrow=new fabric.Polygon([{x:coords.x1, y:coords.y1},{x:coords.x2, y:coords.y2},{x:coords.x3, y:coords.y3}], {stroke: '#FF0000', fill:'transparent'});
        	 	var rulerRightArrow=new fabric.Polygon([{x:coords.x4, y:coords.y4},{x:coords.x5, y:coords.y5},{x:coords.x6, y:coords.y6}],{stroke: '#FF0000', fill:'transparent'});

                rulertext=new fabric.Text(points[i].line1.sm.toFixed(0)+'мм. ', {left: coords.x, top: coords.y, fontSize: 12, fontFamily: 'Century Gothic', stroke: 'red'});
                rulertext.selectable=false;
                points[i].line1.rulertext=rulertext;
                points[i].line1.rulertext.name='ruler';
                points[i].line1.rulertext.id=i;
                points[i].line1.rulertext.rulerLine=rulerLine;
                points[i].line1.rulertext.rulerLeftArrow=rulerLeftArrow;
                points[i].line1.rulertext.rulerRightArrow=rulerRightArrow;
                canvas.add(rulertext);
                canvas.add(rulertext.rulerLine);
                canvas.add(rulertext.rulerLeftArrow);
                canvas.add(rulertext.rulerRightArrow);

     		   }


     	}

        canvas.renderAll();
        return points;
     }


   // перепроверить размеры после редактирования контура

    function reCheckSizes(points)
     {
        console.log('заход в reCheckSizes');
        var coords;
     	for (var i=0; i<points.length; i++)
     	{
     		if (points[i].line1)
     		   {
     		   	console.log (i+'====> ДО ТРАНСФОРМАЦИИ');
     		   	console.log(points[i].line1.rulertext);
     		    coords=defineXY(points[i].line1);
                points[i].line1.rulertext.left=coords.x;
                points[i].line1.rulertext.top=coords.y;

                points[i].line1.rulertext.rulerLine.set({'x1':coords.x1, 'y1': coords.y1, 'x2': coords.x4, 'y2': coords.y4});
                points[i].line1.rulertext.rulerLine.setCoords();

                points[i].line1.rulertext.rulerLeftArrow.set({'points':[{x:coords.x1, y:coords.y1},{x:coords.x2, y:coords.y2},{x:coords.x3, y:coords.y3}]});
                points[i].line1.rulertext.rulerLeftArrow.setCoords();

                points[i].line1.rulertext.rulerRightArrow.set({'points':[{x:coords.x4, y:coords.y4},{x:coords.x5, y:coords.y5},{x:coords.x6, y:coords.y6}]});
                points[i].line1.rulertext.rulerRightArrow.setCoords();

                canvas.renderAll();


              //  console.log ('====> ПОСЛЕ ТРАНСФОРМАЦИИ');
              //  console.log(points[i].line1.rulertext);
     		   }
        /*    if (points[i].line2)
     		   {
                coords=defineXY(points[i].line2);
                points[i].line2.rulertext.left=coords.x;
                points[i].line2.rulertext.top=coords.y;
                points[i].line2.rulertext.rulerLine.x1=coords.x1;
                points[i].line2.rulertext.rulerLine.y1=coords.y1;
                points[i].line2.rulertext.rulerLine.x2=coords.x4;
                points[i].line2.rulertext.rulerLine.y2=coords.y4;

                       }
           if (points[i].line3)
     		   {
                coords=defineXY(points[i].line3);
                points[i].line3.rulertext.left=coords.x;
                points[i].line3.rulertext.top=coords.y;
                points[i].line3.rulertext.rulerLine.x1=coords.x1;
                points[i].line3.rulertext.rulerLine.y1=coords.y1;
                points[i].line3.rulertext.rulerLine.x2=coords.x4;
                points[i].line3.rulertext.rulerLine.y2=coords.y4;
                       }
           if (points[i].line4)
     		   {
                coords=defineXY(points[i].line4);
                points[i].line4.rulertext.left=coords.x;
                points[i].line4.rulertext.top=coords.y;
                points[i].line4.rulertext.rulerLine.x1=coords.x1;
                points[i].line4.rulertext.rulerLine.y1=coords.y1;
                points[i].line4.rulertext.rulerLine.x2=coords.x4;
                points[i].line4.rulertext.rulerLine.y2=coords.y4;

                       }       */

                   	}

        canvas.renderAll();
        return points;
     }

   // установить размер
    function rulerSet (event)
     {

        /* canvas.on('mouse:down', function(e)
        {
        	var line=e.target;
        	if (line) console.log(line);
        	if((line)&&(line.name=="line"))
        	 {
        	   if (line.father)
        	     { console.log('попали в дочернюю линию');
        	       line=line.father;
                  }
               console.log('Линия'+line.leftpoint+'-'+line.rightpoint);
        	 */
        	 var CX = event.offsetX==undefined?event.layerX:event.offsetX;  // x2
             var CY = event.offsetY==undefined?event.layerY:event.offsetY;  // y2
             console.log ('Ruler set. Offset:');
             console.log ('CX='+CX+';  CY='+CY);
             console.log ('Ruler set. pageX:');
             console.log ('CX='+event.pageX+';  CY='+event.pageY);
                          console.log ('Ruler set. clientX:');
             console.log ('CX='+event.clientX+';  CY='+event.clientY);


             var p=findBeforePoint(points, CX, CY);
             if (p)

             { var line=p.line1;
        	  if (line.sm)
        	     {
                  var size=prompt('Введите новый размер этого участка в мм.', line.sm.toFixed(0));
                  size=Number(size);
        	 	  if ((size)&&(size!==line.sm)&&(size>0))
                     {  var newx,newy;
                     	var dm=line.sm/line.size;
                     	console.log ('Установленная пропорция мм/пиксели='+dm);
                     	var newsize=size/dm;
                        console.log ('Старый миллиметраж='+line.sm+'мм; старый размер='+line.size+'пикселей, новый миллиметраж='+size+'мм; новый размер='+newsize);

                     	var delta=newsize-line.size;
                     	delta=Math.ceil(delta);
                        line.sm=size;
                        line.size=newsize;
                        var side=line.side;
                        line.rulertext.text=line.sm+'мм.';
                        // p - точка, в линию line1 которой мы попали мышкой. То есть, следующая точка
                     	  if (line.linetype==1)
                     	   {
                     	   	newx=p.left+delta*side;
                     	   	newy=p.top;
                     	   }

                     	  if (line.linetype==2)
                     	   {
                     	   	newx=p.left;
                     	   	newy=p.top-delta*side;
                     	   }

                     	 if (line.linetype==3)
                     	  {
                     	    delta=delta/Math.sqrt(2);
                     	  	newx=p.left+side*delta;
                     	  	newy=p.top-side*delta;
                            delta=newx-p.left;
                     	  }
                         p=changePoint(p, newx,newy);
                         p=addSize(points,p.id);
                         if (line.linetype==1)
                             {points=reorder(points,p.id,line.linetype,delta*side); }
                         if (line.linetype==2)
                             {points=reorder(points,p.id,line.linetype,delta*side*(-1)); }
                          if (line.linetype==3)
                             {points=reorder(points,p.id,line.linetype,delta); }
                         points=reCheckSizes(points);



                     }
        	     }
        	   else

        	    {
        	  	  var size=prompt('Введите размер этого участка в мм.', 1000);
        	  	  document.getElementById('hint_07').style.display='block';
        	  	  document.getElementById('hint_10').style.display='block';
        	  	  document.getElementById('hint_06').style.display='none';

        	  	  size=Number(size);
        	 	  if ((size)&&(size>0))
	        	 	{
        	 		line.sm=size;
        	 		var dm=line.sm/line.size
        	 	//	console.log('Задаём пропорцию: '+line.size+'точек - '+size+' мм, множитель= '+dm);
        	 		var coords=defineXY(line); // Вычисляем координаты надписи с мм.

        	 		 var rulerLine=new fabric.Line ([coords.x1,coords.y1,coords.x4,coords.y4], {stroke: '#FF0000', strokeWidth: 1});
        	 		 var rulerLeftArrow=new fabric.Polygon([{x:coords.x1, y:coords.y1},{x:coords.x2, y:coords.y2},{x:coords.x3, y:coords.y3}], {stroke: '#FF0000', fill:'transparent'});
        	 		 var rulerRightArrow=new fabric.Polygon([{x:coords.x4, y:coords.y4},{x:coords.x5, y:coords.y5},{x:coords.x6, y:coords.y6}],{stroke: '#FF0000', fill:'transparent'});

                    var rulertext=new fabric.Text(size+'мм. ', {left: coords.x, top: coords.y, fontSize: 12, fontFamily: 'Century Gothic', stroke:'red'});
                        rulertext.selectable=false;
                        line.rulertext=rulertext;
                        line.rulertext.name='ruler';
                        line.rulertext.id=line.leftpoint;
                        line.rulertext.rulerLine=rulerLine;
                        line.rulertext.rulerLeftArrow=rulerLeftArrow;
                        line.rulertext.rulerRightArrow=rulerRightArrow;
                    canvas.add(rulertext);
                    canvas.add(rulertext.rulerLine);
                    canvas.add(rulertext.rulerLeftArrow);
                    canvas.add(rulertext.rulerRightArrow);

        	 		points=checkSizes(points,dm);

        	 		var countbutton=document.getElementById('countPieces');
        	 		countbutton.style.display='block';
        	 	       }

        	        }

        	   }
        	  }



     /////////////////////////////////////////////////////////
    //                                                     //
   //      У С Т А Н О В К А  Р А З М Е Р А               //
  //                                                     //
 /////////////////////////////////////////////////////////

    function PutSizes()
      {
        if (start!=0) start=0;

        var n=points.length;

    //  Добавляем длины ко всем отрезкам

        for (var i=0; i<n-1; i++)
          {
            points[i]=addSize(points,i);
//            points[i].stroke='rgba(0,0,0,0)';
//            points[i].fill='rgba(0,0,0,0)';
            canvas.bringToFront(points[i]);
            }


        points=clearHint(points);
        pushButton('ruler', 'edit', 'erase', 'draw', 'countPieces', 'savePicture');
        document.getElementById('hint_top').style.display='block';

        document.getElementById('hint_top').innerHTML='Режим установки размеров. Кликайте на рёбра шинопровода и указывайте длину ребра в мм';

      	canvas.defaultCursor='default';
	    place.removeEventListener('click', drawPoint);
	    place.removeEventListener('mousemove', drawLine);
	    place.removeEventListener('dblclick', stopLine);
        place.removeEventListener('click', showPoint, false);
        place.removeEventListener('dblclick', delPoint, false);

        place.addEventListener('click',rulerSet,false);

      }

    function SizeRequest()
    {
    	var table=document.getElementById('sizesubmit');
            table.style.display="block";

    }

    function putPicture(img, delta)
      {
    	               	 img.height=delta;
    	               	 img.hasControls=false;
    	               	 img.selectable=false;
    	               	 img.hasBorders=true;
    	               	 canvas.add(img);
    	               	 canvas.on ('mouse.move', function (options){
    	               	 var p=canvas.getPointer(options.e);
    	               	 canvas.forEachObject(function(obj){
    	               	 	  if ((Math.abs(p.x-object.left)<5)&&(Math.abs(p.y-object.top)<object.height))
    	               	 	    {
    	               	 	     obj.borderColor='rgba(139, 195, 74,1)';
    	               	 	     obj.padding=4;
    	               	 	     canvas.renderAll();
    	               	 	    }
    	               	     });
    	               	 });
    	               	 return img;
    	               	 	 }

   // Показать табличку с данными об участке шинопровода, на который кликнули
    function showFragment(event)
    {

          	 var CX = event.offsetX==undefined?event.layerX:event.offsetX;  // x2
             var CY = event.offsetY==undefined?event.layerY:event.offsetY;  // y2

             var p=findBeforePoint(points, CX, CY);
             if (p)

             {
              document.getElementById('hint_span').style.display='none';
              document.getElementById('info_span').style.display='none';
              document.getElementById('hintouts_span').style.display='none';


            //  console.log('Показываю фрагмент '+p.id);
              var sects=document.getElementById('otvodsect');
              sects.innerHTML='<span></span>';
              var g=0;

              document.getElementById('fragment_check').style.display='block';
              document.getElementById('point_id').value=p.id;
              document.getElementById('fragno').innerHTML='Участок '+p.id;
              document.getElementById('dlina').innerHTML='Длина всего отрезка(мм):'+p.line1.sm.toFixed(0);
              if ((p.line1.linetype==1)||(p.line1.linetype==3))
              document.getElementById('dimension').innerHTML='Расположение: горизонтальное';
              else
              document.getElementById('dimension').innerHTML='Расположение: вертикальное';

      // ПОДСВЕЧИВАЮ ФРАГМЕНТ, НА КОТОРЫЙ КЛИКНУЛИ

               p.line1.stroke='rgba(45,109, 121,1.0)';
               p.line1.line1.stroke='rgba(45,109, 121,1.0)';
          //     p.line1.line2.stroke='rgba(45,109, 121,1.0)';
               canvas.renderAll();

              if (p.line1.millies4)
              {
                 document.getElementById('mil4').checked=true;
                 document.getElementById('mil4').value=1;
                 document.getElementById('mil4_val').value=p.line1.millies4;
                 document.getElementById('mil4_val').innerHTML=p.line1.millies4;

                 for (var j=0; j<p.line1.millies4; j++)
                   {
                     g=j+1;
                     var newspan=document.createElement('span');
                     if (p.line1.outs_mil4[j]==1)
                     newspan.innerHTML=g+'. 4000мм <input type="checkbox" checked onClick="JavaScript: chgValue(\'mil4o'+j+'\');"><input type="hidden" name="mil4_outs" id="mil4o'+j+'" value="1">';
                     if (p.line1.outs_mil4[j]==0)
                     newspan.innerHTML=g+'. 4000мм <input type="checkbox" onClick="JavaScript: chgValue(\'mil4o'+j+'\');"><input type="hidden" name="mil4_outs" id="mil4o'+j+'" value="0">';
                     newspan.style.display='block';
                     sects.appendChild(newspan);
                     }

                 }
                 else
                 {
                 document.getElementById('mil4').checked=false;
                 document.getElementById('mil4').value=0;
                 document.getElementById('mil4_val').value=0;
                 document.getElementById('mil4_val').innerHTML="-";

                 }
              if (p.line1.millies3)
              {
                 document.getElementById('mil3').checked=true;
                 document.getElementById('mil3').value=1;
                 document.getElementById('mil3_val').value=p.line1.millies3;
                 document.getElementById('mil3_val').innerHTML=p.line1.millies3;

                  for (var j=0; j<p.line1.millies3; j++)
                   {
                     g=j+1;
                     var newspan=document.createElement('div');
                     if (p.line1.outs_mil3[j]==1)
                     newspan.innerHTML=g+'. 3000мм <input type="checkbox" checked onClick="JavaScript: chgValue(\'mil3o'+j+'\');"><input type="hidden" name="mil3_outs" id="mil3o'+j+'" value="1">';
                     if (p.line1.outs_mil3[j]==0)
                     newspan.innerHTML=g+'. 3000мм <input type="checkbox" onClick="JavaScript: chgValue(\'mil3o'+j+'\');"><input type="hidden" name="mil3_outs" id="mil3o'+j+'" value=0>';
                     sects.appendChild(newspan);
                     }

                 }
                 else
                 {
                 document.getElementById('mil3').checked=false;
                 document.getElementById('mil3').value=0;
                 document.getElementById('mil3_val').value=0;
                 document.getElementById('mil3_val').innerHTML="-";

                 }
              if (p.line1.millies2)
              {
                 document.getElementById('mil2').checked=true;
                 document.getElementById('mil2').value=0;
                 document.getElementById('mil2_val').value=p.line1.millies2;
                 document.getElementById('mil2_val').innerHTML=p.line1.millies2;

                  for (var j=0; j<p.line1.millies2; j++)
                   {
                     g=j+1;
                     var newspan=document.createElement('div');
                     if (p.line1.outs_mil2[j]==1)
                     newspan.innerHTML=g+'. 2000мм <input type="checkbox" checked onClick="JavaScript: chgValue(\'mil2o'+j+'\');"><input type="hidden" name="mil2_outs" id="mil2o'+j+'" value="1">';
                     if (p.line1.outs_mil2[j]==0)
                     newspan.innerHTML=g+'. 2000мм <input type="checkbox" onClick="JavaScript: chgValue(\'mil2o'+j+'\');"><input type="hidden" name="mil2_outs" id="mil2o'+j+'" value=0>';
                     newspan.style.display='block';
                     sects.appendChild(newspan);
                     }
                 }
                  else
                 {
                 document.getElementById('mil2').checked=false;
                 document.getElementById('mil2').value=0;
                 document.getElementById('mil2_val').value=0;
                 document.getElementById('mil2_val').innerHTML="-";

                 }
              if (p.line1.millies)
              {
                 document.getElementById('mil').checked=true;
                 document.getElementById('mil').value=1;
                 document.getElementById('mil_val').value=p.line1.millies;
                 document.getElementById('mil_val').innerHTML=p.line1.millies;

                 }
                  else
                 {
                 document.getElementById('mil').checked=false;
                 document.getElementById('mil').value=0;
                 document.getElementById('mil_val').value=0;
                 document.getElementById('mil_val').innerHTML="-";
                }

              if ((p.line1.rest)&&(p.line1.rest>0)&&(p.line1.rest<1000))
                  {
                  document.getElementById('is_rest').innerHTML='На участке есть отрезок с нестандартными размерами';
                  document.getElementById('addto_span').style.display='block';
                  document.getElementById('rest_value').innerHTML=p.line1.rest+' мм.';
                   }
              if (!p.line1.rest)
                 {
                  document.getElementById('is_rest').innerHTML='На участке нет отрезков с нестандартными размерами';
                  document.getElementById('addto_span').style.display='none';
                  }
              if ((p.line1.rest)&&(p.line1.rest>1000))
                  {   document.getElementById('is_rest').innerHTML='На участке есть отрезок с нестандартными размерами';
                      document.getElementById('rest_value').innerHTML=p.line1.rest+' мм.';
                      document.getElementById('addto_span').style.display='none';
	                  }
                // форма изменения участков шинопровода

             }
    }

   // Вывод данных о шинопроводе в табличку слева
    function showTable(points)
    {

          document.getElementById('savePicture').style.display='block';
          console.log('Зашла в showTable');
          document.getElementById('svodka').style.display='block';
          document.getElementById('alcu').innerHTML='Металл шины: '+document.getElementById('metall').value;
          document.getElementById('ampervalue').innerHTML='Сила тока(А): '+document.getElementById('amperage').value;


           var blocks4000=0,
           blocks3000=0,
           blocks2000=0,
           blocks1000=0,
           outs='',
           rest='',
           midrest=0,
           angle_ver=0,
           angle_ver_ns=0,
           angle_ver_sizes='',
           angle_hor=0,
           angle_hor_ns=0,
           angle_hor_sizes='',
           triple_ver=0,
           triple_ver_ns=0,
           triple_ver_sizes='',
           triple_hor=0,
           triple_hor_ns=0,
           triple_hor_sizes='',
           quadro=0,
           quadro_ns=0,
           quadro_ns_sizes='',
           zangles=0,
           zangles_sizes='',
           end_names='',
           angle_end=1;


           if (points[0].endtype!=null)
                 end_names='0. '+points[0].endtype+'<br>';
                    else points[0].endtype="free";

       for (var i=1; i<points.length; i++)
        {
           blocks4000+=points[i].line1.millies4;
           blocks3000+=points[i].line1.millies3;
           blocks2000+=points[i].line1.millies2;
           blocks1000+=points[i].line1.millies;

           if (points[i].line1.millies4)
             {
             	for (var j=0; j<points[i].line1.millies4; j++)
             	 if (points[i].line1.outs_mil4[j]==1)
             	    outs+='<br> На отрезке '+i+' у '+j+'-го отрезка длиной 4000';
             }

           if (points[i].line1.millies3)
             {
             	for (var j=0; j<points[i].line1.millies3; j++)
             	 if (points[i].line1.outs_mil3[j]==1)
             	    outs+='<br> На отрезке '+i+' у '+j+'-го отрезка длиной 3000';
             }

           if (points[i].line1.millies2)
             {
             	for (var j=0; j<points[i].line1.millies2; j++)
             	 if (points[i].line1.outs_mil2[j]==1)
             	    outs+='<br> На отрезке '+i+' у '+j+'-го отрезка длиной 2000';
             }

           if ((points[i].line1.rest!== undefined)&&(points[i].line1.rest!==0))
             {
             	midrest=parseInt(points[i].line1.rest,10);
             	midrest=midrest.toFixed(0);
             	rest+=midrest+'; ';

             	}
           if (points[i].angle_type==2)
             {
             if (points[i].angle_side01==500)
                  angle_ver++;
                else
                  {
                  	angle_ver_ns++;
                  	angle_ver_sizes+=' '+points[i].angle_side01+'х500';
                  }
              }
           if (points[i].angle_type==1)
              {
                if (points[i].angle_side01==500)
                  angle_hor++;
                else
                  {
                  	angle_hor_ns++;
                  	angle_hor_sizes+=' '+points[i].angle_side01+'х500';
                  }
              }
           if (points[i].angle_type==3)
              {
               if (points[i].angle_side01==500)
                  triple_ver++;
                else
                  {
                  	triple_ver_ns++;
                  	triple_ver_sizes+=' '+points[i].angle_side01+'х500х500';
                  }
              	}
           if (points[i].angle_type==4)
               {
               if (points[i].angle_side01==500)
                  triple_ver++;
                else
                  {
                  	triple_ver_ns++;
                  	triple_ver_sizes+=' '+points[i].angle_side01+'х500х500';
                  }
              	}
           if (points[i].angle_type==5)
               {
               if (points[i].angle_side01==500)
                  quadro++;
                else
                  {
                  	quadro_ns++;
                  	quadro_ns_sizes+=' '+points[i].angle_side01+'х500х500x500';
                  }
              	}

           else
             {
             if ((points[i].line1)&&(!points[i].line2)&&(!points[i].line3)&&(!points[i].line4))
                {
                	angle_end++;
                	if (points[i].endtype!=null)
                	  {
                	  	end_names+=i+'. '+points[i].endtype+'<br>';
                	    console.log(points[i].endtype);
                	   }
                	  else points[i].endtype="free";

                 }
               }

           if (points[i].line1.zangle!=null)
             {
                zangles++;
                zangles_sizes+=points[points[i].line1.leftpoint].angle_side01+'x'+points[i].line1.sm.toFixed()+'x'+points[i].angle_side02+'<br>';
             }

           }



         if (blocks4000>0)
         {
           document.getElementById('sm4000').style.display='block';
           document.getElementById('sm4000').innerHTML='Прямые секции на 4000мм.: '+blocks4000;
          }
          else
             document.getElementById('sm4000').style.display='none';

         if (blocks3000>0)
         {
           document.getElementById('sm3000').style.display='block';
           document.getElementById('sm3000').innerHTML='Прямые секции на 3000мм.: '+blocks3000;
          }
            else
             document.getElementById('sm3000').style.display='none';

         if (blocks2000>0)
         {
           document.getElementById('sm2000').style.display='block';
           document.getElementById('sm2000').innerHTML='Прямые секции на 2000мм.: '+blocks2000;
           }
             else
             document.getElementById('sm2000').style.display='none';

         if (blocks1000>0)
         {
           document.getElementById('sm1000').style.display='block';
           document.getElementById('sm1000').innerHTML='Прямые секции на 1000мм.: '+blocks1000;

          }
            else
             document.getElementById('sm1000').style.display='none';

         if (rest!='')
         {
           document.getElementById('rest').style.display='block';
           document.getElementById('rest').innerHTML='Размеры нестандартных секций (мм): '+rest;

          }
            else
             document.getElementById('rest').style.display='none';
          if (outs!='')
           {
           	outs='Имеются фрагменты шинопровода с отводами: <br>'+outs;
           	document.getElementById('out_show').style.display='block';
           	document.getElementById('out_show').innerHTML=outs;
           }
           else
           {
           		document.getElementById('out_show').style.display='none';

           }
          if (angle_hor>0)
           {
           document.getElementById('ug_horz').style.display='block';
           document.getElementById('ug_horz').innerHTML='Горизонтальных углов 500x500: '+angle_hor;

           }

           if (angle_hor_ns>0)
           {
           document.getElementById('ug_horz_ns').style.display='block';
           document.getElementById('ug_horz_ns').innerHTML='<br>Нестандартных горизонтальных углов: '+angle_hor_ns+'<br> Размеры нестандартных углов: '+angle_hor_sizes;
           }


           if (angle_ver>0)
           {
           document.getElementById('ug_vert').style.display='block';
           document.getElementById('ug_vert').innerHTML='Вертикальных углов 500x500: '+angle_ver;

           }

           if (angle_ver_ns>0)
           {
           document.getElementById('ug_vert_ns').style.display='block';
           document.getElementById('ug_vert_ns').innerHTML='<br>Нестандартных вертикальных углов: '+angle_ver_ns+'<br> Размеры нестандартных углов: '+angle_ver_sizes;

           }

           if (triple_ver>0)
           {
           document.getElementById('triple_ver').style.display='block';
           document.getElementById('triple_ver').innerHTML='Вертикальных тройников 500х500х500: '+triple_ver;

           }

           if (triple_ver_ns>0)
           {
           document.getElementById('triple_ver_ns').style.display='block';
           document.getElementById('triple_ver_ns').innerHTML='<br>Нестандартных вертикальных тройников: '+triple_ver_ns+'<br> Размеры нестандартных тройников: '+triple_ver_sizes;

           }


           if (triple_hor>0)
           {
           document.getElementById('triple_hor').style.display='block';
           document.getElementById('triple_hor').innerHTML='Горизонтальных тройников 500х500х500: '+triple_hor;

           }


           if (triple_hor_ns>0)
           {
           document.getElementById('triple_hor_ns').style.display='block';
           document.getElementById('triple_hor_ns').innerHTML='<br>Нестандартных горизонтальных тройников: '+triple_hor_ns+'<br> Размеры нестандартных тройников: '+triple_hor_sizes;

           }


           if (quadro>0)
           {
           document.getElementById('quadro').style.display='block';
           document.getElementById('quadro').innerHTML='Крестовин 500х500х500х500: '+quadro;

           }

           if (quadro_ns>0)
           {
           document.getElementById('quadro_ns').style.display='block';
           document.getElementById('quadro_ns').innerHTML='<br>Нестандартных крестовин: '+quadro_ns+'<br> Размеры нестандартных крестовин: '+quadro_ns_sizes;

           }

           if (zangles>0)

           {
           document.getElementById('zangle').style.display='block';
           document.getElementById('zangle').innerHTML='Z-образных углов: '+zangles+'<br> Размеры z-образынх углов: '+zangles_sizes;
                 }
           if (angle_end>0)
           {
           document.getElementById('ug_end').style.display='block';
           document.getElementById('ug_end').innerHTML='Свободных концов: '+angle_end;
           document.getElementById('ug_end').innerHTML+='<br>'+end_names+'<br>';

           // Вставить кнопку выбора концов

           document.getElementById('check_ends').style.display='block';

           }

    }


  // Показать соединительные блоки
    function showBlocks(points, i)
      {
      	   // соединительных блоков
      var   blocks,
            // пропорция между пикселями и милиметрами
            delta,
            // нижняя (левая) точка отрезка
            lowpoint,
            // верхняя (правая) точка отрезка - нужно когда вычисляешь угол для вертикального отрезка
            highpoint,
            // счётчик
            k,
            // размер плеча угла
            angle,
            ok=0,
            // высота блока - один раз вычислили и потом пользуемся
            blockheight,
            ipblocks=[],
            imgObj,
            //
            p1,p2,p3,p4,
            // хвост феи
            fairytail;
            var side1, side2, side3, sidex, sidey;
            var triangletype;

         delta=1000*points[i].line1.size/points[i].line1.sm;
         blockheight=delta/10;

      	  //Корректируем размеры и направлеия линий, выходящих из точки i
         points[i]=addSize(points,i);
         // Вычисляем какая точка левая(нижняя), какая правая(верхняя)
         if (points[i].line1.side==1)
               {
               lowpoint=points[points[i].line1.leftpoint];
               highpoint=points[i];
               }
         else
           {
           lowpoint=points[i];
           highpoint=points[points[i].line1.leftpoint];
           }

         if (points[i].angle_side01)
          angle=points[i].angle_side01;
           else angle=500;
          angle=angle/1000;

          var angle2;
         if (points[i].angle_side02)
          angle2=points[i].angle_side02;
           else angle2=500;
          angle2=angle2/1000;


      //   console.log('верхний угол на отрезке '+i+': '+angle);
      //   console.log('Нижняя(левая) точка: ['+lowpoint.left+','+lowpoint.top+'];'+' Верхняя(правая) точка: ['+highpoint.left+','+highpoint.top+']');


         // рисуем угол!
         var CX, CY;


        //  	console.log ('Тип угла:'+points[i].angle_type+'; line1.linetype='+points[i].line1.linetype+'; line1.side='+points[i].line1.side+'; line2.linetype='+points[i].line2.linetype+'; line2.side='+points[i].line2.side);
          	var deltax, deltay, sidex, sidey;
          	/* №1-№12  вертикальные углы */
          	 points[i].set('fill', 'transparent');
          	 points[i].set('stroke', 'transparent');

             if (points[i].angle_type>0)
        {
            console.log ('Вершина '+i+' Уголок типа '+points[i].angle_type);
            if (points[i].angle_type==2)
            {

          	if ((points[i].line1.linetype==2)&&(points[i].line2.linetype==1))
          	 {
          	 /*   №1-№4
          	     ____________
          	    | i |  line2 |
          	    |---| --------
          	    | l |
          	    | i |
          	    | n |
          	    | e |
          	    | 1 |
          	    -----
          	 */

          	 	sidey=points[i].line1.side;
          	 	sidex=points[i].line2.side;
          	 	deltax=angle2;
          	 	deltay=angle;
          	 }
          	if ((points[i].line1.linetype==1)&&(points[i].line2.linetype==2))
          	 {
          	  /*
          	     ____________
          	    | i |  line1 |
          	    |---| --------
          	    | l |
          	    | i |
          	    | n |
          	    | e |
          	    | 2 |
          	    -----
          	 */
          	 	sidey=-points[i].line2.side;
          	 	sidex=-points[i].line1.side;
          	 	deltax=angle;
          	 	deltay=angle2;
          	 }
            /* №5-№8 диагональные вертикальные углы */
          	if ((points[i].line1.linetype==2)&&(points[i].line2.linetype==3)&&(points[i].line2.side*points[i].line1.side>0))
          	   {side1=points[i].line1.side;
          	    side2=points[i].line2.side;
          	    }
          	if ((points[i].line1.linetype==3)&&(points[i].line2.linetype==2)&&(points[i].line2.side*points[i].line1.side>0))
          	   {side1=-points[i].line1.side;
          	    side2=-points[i].line2.side;
          	    }
            if ((((points[i].line1.linetype==2)&&(points[i].line2.linetype==3))||((points[i].line1.linetype==3)&&(points[i].line2.linetype==2)))&&(points[i].line2.side*points[i].line1.side<0))
          	   {side1=points[i].line1.side;
          	    side2=points[i].line2.side;
          	    }
             }
            if (points[i].angle_type==1)
            {
         /* №9-№12 горизонтальные углы */
          	if ((points[i].line1.linetype==3)&&(points[i].line2.linetype==1)&&(points[i].line2.side*points[i].line1.side>0))
          	   {side1=points[i].line1.side;
          	    side2=points[i].line2.side;
          	    }
          	if ((points[i].line1.linetype==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side*points[i].line1.side>0))
          	   {side1=-points[i].line1.side;
          	    side2=-points[i].line2.side;
          	    }
            if ((((points[i].line1.linetype==1)&&(points[i].line2.linetype==3))||((points[i].line1.linetype==3)&&(points[i].line2.linetype==1)))&&(points[i].line2.side*points[i].line1.side<0))
          	   {side1=points[i].line1.side;
          	    side2=points[i].line2.side;
          	    }
             }

            if (points[i].angle_type==4)

            /* №13-№20 Вертикальные тройнички
             ______________
            |              |
            |____      ____|
                 |    |
                 |____|

            */

           {

            console.log ('Тройничок: line1='+ points[i].line1.linetype+' line2='+points[i].line2.linetype+' line3='+points[i].line3.linetype);
            console.log ('line1.side='+ points[i].line1.side+' line2.side='+ points[i].line2.side+' line3.side='+ points[i].line3.side);
            if (((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1)))
            { side1=1;
              side2=1;
              side3=-1;
              triangletype=1;
              console.log('Тройничок мордой вниз');
            }

              if (((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1)))
            { side1=1;
              side2=1;
              side3=1;
              triangletype=1;
                console.log('Тройничок мордой вверх');
            }

             if (((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
               ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
               ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1)))
            { side1=1;
              side2=1;
              side3=1;
              triangletype=2;
              console.log('Тройничок мордой вправо');
            }

              if (((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1)))
            { side1=1;
              side2=1;
              side3=-1;
              triangletype=2;
                console.log('Тройничок мордой влево');
            }
              // UbpcO)uAQSKlPth^OE


              /* Диагональные тройнички №17 - №18 */

                if (((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1)))

                  {
                   console.log ('Тройничок №17');
                   side3=1;
                   triangletype=3;
                   k=0;}

              if (((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1)))
{
                   console.log ('Тройничок №18');
                   side3=-1;
                   triangletype=3;
                   k=1;}

              /* Диагональные тройнички №19 - №20 */

              if (((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1)))

            {
                   console.log ('Тройничок №19');
                   side3=1;
                   triangletype=4;
                   k=0;}

              if (((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==2)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1)))
 {
                   console.log ('Тройничок №20');
                   side3=-1;
                   triangletype=4;
                   k=1;}
              }
             //  18Xd5yjHQ3CAjUeF
          if (points[i].angle_type==3)

          {  /* Горизонтальные тройнички №21 - №22 */

              if (((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1)))
{
                   console.log ('Тройничок №21');
                   side3=1;
                   triangletype=1;
                   k=0;
                   m=1;}

                if (((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))) {
                   console.log ('Тройничок №22');
                   side3=-1;
                   triangletype=1;
                   k=1;
                   m=0;}

              /* Диагональные тройнички №23 - №24 */

               if (((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1)))
                {
                   console.log ('Тройничок №23');
                   side3=1;
                   triangletype=2;
                   k=0;
                   m=1;}

             if (((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==1)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.linetype==-1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.linetype==-1)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==1))
                ||((points[i].line1.linetype==1)&&(points[i].line1.side==1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)&&(points[i].line3.linetype==3)&&(points[i].line3.side==-1)))

               {
                   console.log ('Тройничок №24');
                   side3=-1;
                   triangletype=2;
                   k=1;
                   m=0;}
          }

          var depth=points[i].line1.strokewidth/2;
          if ((points[i].angle_type==1)||(points[i].angle_type==2))

          {
          /* Рисуем вертикальные углы №1-№4 */
          if (((points[i].line1.linetype==1)&&(points[i].line2.linetype==2))||((points[i].line1.linetype==2)&&(points[i].line2.linetype==1)))
          {
             CX=points[i].x-w;
             CY=points[i].y;
             var figure1=new fabric.Polygon([{x: CX-sidex*w,y:CY-sidey*w},
                                          {x: CX-sidex*w,y:CY+sidey*5*w},
                                          {x: CX+sidex*w,y:CY+sidey*5*w},
                                          {x: CX+sidex*w,y:CY+sidey*w},
                                          {x: CX+sidex*5*w,y:CY+sidey*w},
                                          {x: CX+sidex*5*w,y:CY-sidey*w}],
                                          {fill: '#5bd6d6', stroke: '#333' });
       //  var figure1=new fabric.Polygon([{x:CX+10, y:CY+50}, {x:CX-10, y:CY+50}, {x: CX-10, y:CY-10}, {x: CX+50, y:CY-10}, {x: CX+50, y: CY+10}, {x: CX+10, y: CY+10}], {fill: 'red', stroke: '#333'});

           var figure2=new fabric.Polygon([ {x: CX+w,y:CY-sidey*w},
                                          {x: CX+w,y:CY+sidey*5*w},
                                          {x: CX+2*w,y:CY+sidey*5*w-w},
                                          {x: CX+2*w,y:CY-sidey*w-w}],
                                          {fill:'#018080', stroke: '#333', });
          var figure3=new fabric.Polygon([ {x: CX-sidex*w,y:CY-w},
                                          {x: CX-sidex*w+w,y:CY-2*w},
                                          {x: CX+sidex*5*w+w,y:CY-2*w},
                                          {x: CX+sidex*5*w,y:CY-w}],
                                          {fill:'#018080', stroke: '#333'});
           }

          /* Рисуем вертикальные уголки по диагонали №5-№8 */
          if (((points[i].line1.linetype==2)&&(points[i].line2.linetype==3))||((points[i].line1.linetype==3)&&(points[i].line2.linetype==2)))
            {
            	if (side2>0) var k=0; else var k=1;
            	if (side1>0) var m=0; else var m=1;
            	//if ((side2<0)&&(side1<0)) var z=1; else var z=0;
                var z=k*m;

            	CX=points[i].x;
            	CY=points[i].y;

             	if ((points[i].line1.linetype==2)&&(points[i].line2.side==1)) CX=CX-w;
                if ((points[i].line1.linetype==2)&&(points[i].line2.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.side==1)) CY=CY-w;
                if ((points[i].line1.linetype==2)&&(points[i].line2.linetype==3)&&(points[i].line1.side==-1)&&(points[i].line2.side==1)) CY=CY+w;
                if ((points[i].line1.linetype==2)&&(points[i].line2.linetype==3)&&(points[i].line1.side==1)&&(points[i].line2.side==-1)) CY=CY-2*w;
                if ((points[i].line1.linetype==3)&&(points[i].line2.linetype==2)&&(points[i].line1.side==1)&&(points[i].line2.side==-1)) CY=CY-2*w;
                if ((points[i].line1.linetype==3)&&(points[i].line2.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.side==-1)) {CX=CX-w; CY=CY-w;}
                if ((points[i].line1.linetype==3)&&(points[i].line2.linetype==2)&&(points[i].line1.side==-1)&&(points[i].line2.side==1)) { CY=CY+w; CX=CX-w;}


          var figure1=new fabric.Polygon([{x: CX+w,y:CY},
                                          {x: CX+side2*4*w+2*w*k,y:CY-side2*3*w},
                                          {x: CX+side2*4*w+2*w*k,y:CY-side2*3*w+side1*2*w},
                                          {x: CX+side2*2*w+2*w*k,y:CY-side2*w+side1*2*w},
                                          {x: CX+side2*2*w+2*w*k,y:CY-side2*w+side1*6*w},
                                          {x: CX+w,y:CY+side1*6*w}],
                                          {fill: '#018080', stroke: '#333' });

         var figure2=new fabric.Polygon([ {x: CX-w-k*w,y:CY},
                                          {x: CX-w-k*w,y:CY+side1*6*w+w*k},
                                          {x: CX+w-k*w,y:CY+side1*6*w+w*k},
                                          {x: CX+w-k*w,y:CY}],
                                          {fill:'#5bd6d6', stroke: '#333', });

         var figure3=new fabric.Polygon([ {x: CX-w-w*z,y:CY-m*2*w+w*z},
                                          {x: CX-w+side2*3*w,y:CY-side2*3*w-m*2*w},
                                          {x: CX+w+side2*3*w,y:CY-side2*3*w-m*2*w},
                                          {x: CX+w-w*z,y:CY-m*2*w+w*z}],
                                          {fill:'#5bd6d6', stroke: '#333'});
            }


          /* Рисуем горизонтальные уголки №9-№12 */
          if (((points[i].line1.linetype==1)&&(points[i].line2.linetype==3))||((points[i].line1.linetype==3)&&(points[i].line2.linetype==1)))
          {

            	CX=points[i].x;
            	CY=points[i].y;
            	if (side2<0) var p=0; else var p=1;
            	if (side1>0) {var m=0; var k=1;} else {var m=1; var k=0;}
            	if ((side1>0)&&(side2>0)) var z=1; else var z=0;

            	if ((side1==1)&&(side2==1)){CX=CX-w; CY=CY-w;}
            	if ((side1==1)&&(side2==-1)) {CX=CX+w; CY=CY-w;}
            	if ((side1==-1)&&(side2==1)) {CX=CX-2*w;}

          var figure1=new fabric.Polygon([{x: CX,y:CY-w},
                                          {x: CX-side1*3*w,y:CY-w+side1*3*w},
                                          {x: CX-side1*3*w+side2*2*w,y:CY-w+side1*3*w},
                                          {x: CX-side1*w+side2*2*w,y:CY-w+side1*w}],
                                          {fill: '#5bd6d6', stroke: '#333' });
          var figure11=new fabric.Polygon([{x: CX,y:CY-w},
                                          {x: CX-side1*w+side2*2*w,y:CY-w+side1*w},
                                          {x: CX-side1*w+side2*6*w,y:CY-w+side1*w},
                                          {x: CX+side2*6*w,y:CY-w}],
                                          {fill: '#018080', stroke: '#333' });

         var figure2=new fabric.Polygon([ {x: CX-w*k,y:CY-w*m},
                                          {x: CX+side2*6*w-w*k,y:CY-w*m},
                                          {x: CX+side2*6*w-w*k,y:CY+2*w-w*m},
                                          {x: CX-w*k,y:CY+2*w-w*m}],
                                          {fill:'#5bd6d6', stroke: '#333', });

         var figure3=new fabric.Polygon([ {x: CX+2*w*p-w*z,y:CY-w+w*z},
                                          {x: CX-side1*3*w+2*w*p,y:CY-w+side1*3*w},
                                          {x: CX-side1*3*w+2*w*p,y:CY+w+side1*3*w},
                                          {x: CX+2*w*p-w*z,y:CY+w+w*z}],
                                          {fill:'#018080', stroke: '#333'});

          }
                }

          if (points[i].angle_type==4)

           {
           /* Рисуем вертикальные тройнички вверх-вниз №13-№14 */
           	if (triangletype==1)
           	{

             console.log('Рисую тройничок мордой вверх или вниз');
             CX=points[i].x-w;
             CY=points[i].y;
             var figure1=new fabric.Polygon([{x: CX-w,y:CY-side3*w},
                                             {x: CX-w,y:CY-side3*3*w},
                                             {x: CX+w,y:CY-side3*3*w},
                                             {x: CX+w,y:CY-side3*w},
                                             {x: CX+3*w,y:CY-side3*w},
                                             {x: CX+3*w,y:CY+side3*w},
                                             {x: CX-3*w,y:CY+side3*w},
                                             {x: CX-3*w,y:CY-side3*w}
                                          ],
                                          {fill: '#5bd6d6', stroke: '#333' });

           var figure2=new fabric.Polygon([ {x: CX+w,y:CY-side3*w},
                                            {x: CX+w,y:CY-side3*3*w},
                                            {x: CX+2*w,y:CY-side3*3*w-w},
                                            {x: CX+2*w,y:CY-side3*3*w-w+side3*2*w}],
                                            {fill:'#018080', stroke: '#333', });

          var figure3=new fabric.Polygon([ {x: CX-3*w,y:CY-w},
                                          {x: CX-2*w,y:CY-2*w},
                                          {x: CX+4*w,y:CY-2*w},
                                          {x: CX+3*w,y:CY-w}],
                                          {fill:'#018080', stroke: '#333'});
           	}

           /* Рисуем вертикальные тройнички влево-вправо №15-№16 */
           	if (triangletype==2)
           	{

             console.log('Рисую тройничок мордой влево или вправо');
             CX=points[i].x-w;
             CY=points[i].y;
             var figure1=new fabric.Polygon([{x: CX+side3*w,y:CY-side3*w},
                                             {x: CX+side3*3*w,y:CY-side3*w},
                                             {x: CX+side3*3*w,y:CY+side3*w},
                                             {x: CX+side3*w,y:CY+side3*w},
                                             {x: CX+side3*w,y:CY+side3*3*w},
                                             {x: CX-side3*w,y:CY+side3*3*w},
                                             {x: CX-side3*w,y:CY-side3*3*w},
                                             {x: CX+side3*w,y:CY-side3*3*w}
                                          ],
                                          {fill: '#5bd6d6', stroke: '#333' });

           var figure2=new fabric.Polygon([ {x: CX+side3*w,y:CY-w},
                                            {x: CX+side3*3*w,y:CY-w},
                                            {x: CX+side3*3*w+w,y:CY-2*w},
                                            {x: CX+side3*3*w+w-side3*2*w,y:CY-2*w}],
                                            {fill:'#018080', stroke: '#333', });

          var figure3=new fabric.Polygon([{x: CX+w,y:CY-3*w},
                                          {x: CX+2*w,y:CY-4*w},
                                          {x: CX+2*w,y:CY+2*w},
                                          {x: CX+w,y:CY+3*w}],
                                          {fill:'#018080', stroke: '#333'});
           	}

            /* Рисуем вертикальные диагональные тройнички №17-№18 */
           	if (triangletype==3)
           	{

             console.log('Рисую диагональный тройничок мордой влево-вправо');
             if (side3>0)
             {
             CX=points[i].x;
             CY=points[i].y-w;
             }
             else
             {
             CX=points[i].x+w;
             CY=points[i].y;
             }
             var figure1=new fabric.Polygon([{x: CX+side3*w,y:CY-w},
                                             {x: CX+side3*3*w,y:CY-w-side3*2*w},
                                             {x: CX+side3*3*w,y:CY+w-side3*2*w},
                                             {x: CX+side3*w,y:CY+w},
                                             {x: CX+side3*w,y:CY+3*w},
                                             {x: CX,y:CY+3*w+side3*w},
                                             {x: CX,y:CY-3*w+side3*w},
                                             {x: CX+side3*w,y:CY-3*w}
                                          ],
                                          {fill: '#018080', stroke: '#333' });

           var figure2=new fabric.Polygon([ {x: CX-w*k,y:CY-2*w-w*k},
                                            {x: CX-2*w-w*k,y:CY-2*w-w*k},
                                            {x: CX-2*w-w*k,y:CY+4*w-w*k},
                                            {x: CX-w*k,y:CY+4*w-w*k}],
                                            {fill:'#5bd6d6', stroke: '#333', });

          var figure3=new fabric.Polygon([{x: CX+side3*w,y:CY-w},
                                          {x: CX+side3*3*w,y:CY-w-side3*2*w},
                                          {x: CX+side3*3*w-2*w,y:CY-w-side3*2*w},
                                          {x: CX+side3*w-2*w,y:CY-w}],
                                          {fill:'#5bd6d6', stroke: '#333'});
           	}

           /* Рисуем вертикальные диагональные тройнички вверх-вниз №19-№20 */
           	if (triangletype==4)
           	{

             console.log('Рисую диагональный тройничок мордой вверх или вниз');
             if (side3<0)
             { CX=points[i].x;
               CY=points[i].y-w;
               }
               else
               {CX=points[i].x+w;
                CY=points[i].y}
             var figure1=new fabric.Polygon([{x: CX-side3*w,y:CY-side3*w},
                                             {x: CX-side3*w,y:CY-side3*3*w},
                                             {x: CX,y:CY-side3*4*w},
                                             {x: CX,y:CY-side3*2*w},
                                             {x: CX+side3*2*w,y:CY-side3*4*w},
                                             {x: CX+side3*2*w,y:CY-side3*2*w},
                                             {x: CX-side3*2*w,y:CY+side3*2*w},
                                             {x: CX-side3*2*w,y:CY}
                                          ],
                                          {fill: '#018080', stroke: '#333' });

           var figure2=new fabric.Polygon([ {x: CX-w+w*k,y:CY-side3*w+w*k},
                                            {x: CX-w+w*k,y:CY-side3*3*w+w*k},
                                            {x: CX-3*w+w*k,y:CY-side3*3*w+w*k},
                                            {x: CX-3*w+w*k,y:CY-side3*w+w*k}],
                                            {fill:'#5bd6d6', stroke: '#333', });

          var figure3=new fabric.Polygon([{x: CX-2*w,y:CY+2*w*k},
                                          {x: CX-4*w,y:CY+2*w*k},
                                          {x: CX,y:CY-4*w+2*w*k},
                                          {x: CX+2*w,y:CY-4*w+2*w*k}],
                                          {fill:'#5bd6d6', stroke: '#333'});
           	}

           }

           if (points[i].angle_type==3)
           {
           	 /* Рисуем вертикальные тройнички вверх-вниз №21-№22 */
           	if (triangletype==1)
           	{

             console.log('Рисую горизонтальный тройничок 21-22');

             if (side3<0)
             {
             CX=points[i].x-1.5*w;
             CY=points[i].y-w;
             }
             else
             {
             CX=points[i].x-0.5*w-4;
             CY=points[i].y-0.5*w+4;
             }

             var figure1=new fabric.Polygon([{x: CX+w*k,y:CY-2*w*m},
                                             {x: CX+w*k+side3*2*w,y:CY-2*w*m-side3*2*w},
                                             {x: CX+w*k+side3*4*w,y:CY-2*w*m-side3*2*w},
                                             {x: CX+w*k+side3*2*w,y:CY-2*w*m}],
                                          {fill: '#5bd6d6', stroke: '#333' });
             var figure11=new fabric.Polygon([
                                             {x: CX+w*k-side3*2*w,y:CY-2*w*m},
                                             {x: CX+w*k+side3*4*w,y:CY-2*w*m},
                                             {x: CX+w*k+side3*3*w,y:CY-2*w*m+side3*w},
                                             {x: CX+w*k-side3*3*w,y:CY-2*w*m+side3*w}],
                                          {fill: '#018080', stroke: '#333' });

           var figure2=new fabric.Polygon([ {x: CX-3*w,y:CY-w*m},
                                            {x: CX+3*w,y:CY-w*m},
                                            {x: CX+3*w,y:CY+2*w-w*m},
                                            {x: CX-3*w,y:CY+2*w-w*m}],
                                            {fill:'#5bd6d6', stroke: '#333', });

          var figure3=new fabric.Polygon([{x: CX+w+w*m,y:CY-2*w*m},
                                          {x: CX+w+w*m+side3*2*w,y:CY-2*w*m-side3*2*w},
                                          {x: CX+w+w*m+side3*2*w,y:CY-2*w*m-side3*2*w+2*w},
                                          {x: CX+w+w*m,y:CY-2*w*m+2*w}],
                                          {fill:'#018080', stroke: '#333'});
           	}

           /* Рисуем вертикальные тройнички влево-вправо №23-№24 */
           	if (triangletype==2)
           	{

             console.log('Рисую горизонтальный тройничок 23-24');

             if (side3>0)
             { k=1;
               CX=points[i].x-w;
               CY=points[i].y-2*w;
             }
             else
              { CX=points[i].x;
                CY=points[i].y-w;
                k=0;}
             var figure1=new fabric.Polygon([{x: CX+side3*2*w,y:CY},

                         {x: CX+side3*4*w,y:CY},
                                             {x: CX+side3*3*w,y:CY+side3*w},
                                             {x: CX+side3*w,y:CY+side3*w}
                                              ],
                                          {fill: '#018080', stroke: '#333' });
             var figure11=new fabric.Polygon([{x: CX,y:CY+side3*2*w},
                                              {x: CX-side3*2*w,y:CY+side3*2*w},
                                              {x: CX+side3*2*w,y:CY-side3*2*w},
                                              {x: CX+side3*4*w,y:CY-+side3*2*w}
                                          ],
                                          {fill: '#5bd6d6', stroke: '#333' });

           var figure2=new fabric.Polygon([ {x: CX+side3*2*w-w*k,y:CY+w*k},
                                            {x: CX+side3*4*w-w*k,y:CY+w*k},
                                            {x: CX+side3*4*w-w*k,y:CY+2*w+w*k},
                                            {x: CX+side3*2*w-w*k,y:CY+2*w+w*k}],
                                            {fill:'#5bd6d6', stroke: '#333', });

          var figure3=new fabric.Polygon([{x: CX+2*w+2*w*k,y:CY-2*w},
                                          {x: CX+2*w+2*w*k,y:CY},
                                          {x: CX-2*w+2*w*k,y:CY+4*w},
                                          {x: CX-2*w+2*w*k,y:CY+2*w}],
                                          {fill:'#018080', stroke: '#333'});
           	}


           }
       if ((points[i].angle_type==1)||(points[i].angle_type==3))
       {
       points[i].angle=figure1;
       points[i].angle.figure11=figure11;
       points[i].angle.shadow1=figure2;
       points[i].angle.shadow2=figure3;

       canvas.add( points[i].angle.shadow1, points[i].angle.shadow2, points[i].angle, points[i].angle.figure11 );
       canvas.bringToFront(points[i].angle);
       if ((side1==-1)&&(side2==1)) canvas.bringToFront(points[i].angle.shadow1);
       if ((points[i].angle_type==3)&&(side3==1))  canvas.bringToFront(points[i].angle.shadow1);
        }


       if ((points[i].angle_type==2)||(points[i].angle_type==4))
       {
       points[i].angle=figure1;
       points[i].angle.shadow1=figure2;
       points[i].angle.shadow2=figure3;

       canvas.add( points[i].angle.shadow1);
       canvas.add( points[i].angle.shadow2);
       canvas.add( points[i].angle);
       canvas.bringToFront(points[i].angle);
        }


         // !!!! надо дорисовать и для других типов углов: angle_type==3,4,5


         }
         // рисуем тупички
            else
              { CX=points[i].x;
                CY=points[i].y;
                var tupik;
                // Тип №1 вертикальный вниз
              	if (((points[i].line1)&&(points[i].line1.linetype==2)&&(points[i].line1.side==-1))
              	 ||((!points[i].line1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==1)))
              	   {
              	    CX=CX-w;
              	   	tupik = new fabric.Polyline([{x:CX-w, y:CY},{x:CX+w,y:CY},{x:CX+2*w,y:CY-w}],{stroke:'#333', strokeWidth: 2, fill:'transparent'});
              	   	console.log('Конец типа 1');
              	   	console.log(tupik);


              	   }
              	// Тип №2 горизонтальный влево
              	if (((points[i].line1)&&(points[i].line1.linetype==1)&&(points[i].line1.side==-1))
                  ||((!points[i].line1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==1)))
              	   {
              	   	tupik = new fabric.Polyline([{x:CX, y:CY+w},{x:CX,y:CY-w},{x:CX+w,y:CY-2*w}],{stroke:'#333', strokeWidth: 2, fill:'transparent'});
              	   	console.log('Конец типа 2');
              	   	console.log(tupik);
          	   		canvas.add(tupik);
          	   		canvas.bringToFront(tupik);
              	   }

              	// Тип №3 диагональный вперёд
               if (((points[i].line1)&&(points[i].line1.linetype==3)&&(points[i].line1.side==1))
              	 ||((!points[i].line1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==-1)))
                {
              	   	tupik = new fabric.Polyline([{x:CX-2*w, y:CY-w},{x:CX-0.5*w,y:CY-w},{x:CX-0.5*w,y:CY+w}],{stroke:'#333', strokeWidth: 2, fill:'transparent'});
              	   	console.log('Конец типа 3');
              	   	console.log(tupik);
          	   		canvas.add(tupik);
          	   		canvas.bringToFront(tupik);
              	   }

              // Тип №4 вертикальный вверх
              if (((points[i].line1)&&(points[i].line1.linetype==2)&&(points[i].line1.side==1))
              	||((!points[i].line1)&&(points[i].line2.linetype==2)&&(points[i].line2.side==-1)))
              	   {
              	    if (points[i].line1) points[i].line1.set({ 'y2': CY+w });
              	    else {points[i].line2.set({ 'y2': CY+4 });
              	          points[i].line2.line1.set({ 'y2': CY+4}); }
              	    CX=CX-w;
              	    CY=CY+w*1.5;
                   tupik = new fabric.Polygon([{x: CX-w,y:CY},
                                               {x: CX,y:CY-w},
                                               {x: CX+2*w,y:CY-w},
                                               {x: CX+w,y:CY}],
                                              {fill: '#018080', stroke: '#333' });
                                              }

             // Тип №5 горизонтальный вправо
             if (((points[i].line1)&&(points[i].line1.linetype==1)&&(points[i].line1.side==1))
              	 ||((!points[i].line1)&&(points[i].line2.linetype==1)&&(points[i].line2.side==-1)))
              	  { CX=CX-w;
                   tupik = new fabric.Polygon([{x: CX,y:CY-w},
                                               {x: CX+w,y:CY-2*w},
                                               {x: CX+w,y:CY},
                                               {x: CX,y:CY+w}],
                                              {fill: '#018080', stroke: '#333' });
                                              }

             // Тип №6 диагональный назад
             if (((points[i].line1)&&(points[i].line1.linetype==3)&&(points[i].line1.side==-1))
               ||((!points[i].line1)&&(points[i].line2.linetype==3)&&(points[i].line2.side==1)))
              	   {

              	   CX=CX-0.3*w;
              	   CY=CY-w;
                   tupik = new fabric.Polygon([{x: CX-0.8*w,y:CY-w},
                                               {x: CX+0.8*w,y:CY-w},
                                               {x: CX+0.8*w,y:CY+1.5*w},
                                               {x: CX-0.8*w,y:CY+1.5*w}],
                                              {fill: '#5bd6d6', stroke: '#333' });
                                              }
                  tupik.set('selectable',false);
                  points[i].tupik=tupik;
                  canvas.add(points[i].tupik);
                  canvas.bringToFront(points[i].tupik);
                  canvas.renderAll();
              }

         if (points[i].line1.linetype==2) //вертикальный

    	   {  //Рисуем соединительные блоки


            // console.log ('Отрезок '+points[i].line1.leftpoint+' - '+i+'; Секций на 4000 - '+millies4+'; Дельта='+delta+' Верхняя точка: '+points[i].top+'; Нижняя точка: '+points[points[i].line1.leftpoint].top);

               fairytail=0.5*delta*ok;
                  // 4000 мм.
               for (var k=1; k<points[i].line1.millies4; k++)
               {
                CX=lowpoint.left-2*w;
                CY=lowpoint.top-k*delta*4-fairytail;

               	imgObj = new fabric.Polyline([{x:CX, y:CY},{x:CX+2*w,y:CY},{x:CX+3*w,y:CY-w},{x:CX+2*w,y:CY}],{stroke:'#333', fill:'transparent'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               	imgObj = new fabric.Polygon([{x:CX,y:CY-w},{x:CX+2*w,y:CY-w},{x:CX+3*w, y: CY-2*w}, {x: CX+3*w, y: CY}, {x: CX+2*w, y:CY+2}, {x:CX, y:CY+2}],{fill:'rgba(30,30,30,0.4)'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);


             // Здесь нарисовать отводы

                if (points[i].line1.outs_mil4[k-1]==1)
                 {

                    p1=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*w-fairytail+20,
                   	fill: 'white'});

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*w-fairytail+10,
                   	fill: 'white'});

                   	p3=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*w-fairytail,
                   	fill: 'white'});

                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*w-fairytail-10,
                   	fill: 'white'});

                   	canvas.add(p1,p2,p3,p4);
               	    canvas.bringToFront(p1,p2,p3,p4);
               	    ipblocks.push(p1,p2,p3,p4);

                 }


               }

               fairytail=(points[i].line1.millies4*4+0.5*ok)*delta;
                      // 3000мм.
               for (var k=1; k<=points[i].line1.millies3; k++)
               {
                CX=lowpoint.left-2*w;
                CY=lowpoint.top-k*delta*3-fairytail;

               	imgObj = new fabric.Polyline([{x:CX, y:CY},{x:CX+2*w,y:CY},{x:CX+3*w,y:CY-w},{x:CX+2*w,y:CY}],{stroke:'#333', fill:'transparent'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               	imgObj = new fabric.Polygon([{x:CX,y:CY-w},{x:CX+2*w,y:CY-w},{x:CX+3*w, y: CY-2*w}, {x: CX+3*w, y: CY}, {x: CX+2*w, y:CY+w}, {x:CX, y:CY+w}],{fill:'rgba(30,30,30,0.4)'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);


                 if (points[i].line1.outs_mil3[k-1]==1)
                 {

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*3-fairytail+5,
                   	fill: 'white'});

                   	p3=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*3-fairytail,
                   	fill: 'white'});

                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*3-fairytail-5,
                   	fill: 'white'});

                   	canvas.add(p2,p3,p4);
               	    canvas.bringToFront(p2,p3,p4);
               	    ipblocks.push(p2,p3,p4);

                 }


               }

               fairytail=(points[i].line1.millies4*4+points[i].line1.millies3*3+0.5*ok)*delta;

                    // 2000мм.
               for (var k=1; k<=points[i].line1.millies2; k++)
               {
               	CX=lowpoint.left-2*w;
                CY=lowpoint.top-k*delta*2-fairytail;

               	imgObj = new fabric.Polyline([{x:CX, y:CY},{x:CX+2*w,y:CY},{x:CX+3*w,y:CY-w},{x:CX+2*w,y:CY}],{stroke:'#333', fill:'transparent'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               	imgObj = new fabric.Polygon([{x:CX,y:CY-w},{x:CX+2*w,y:CY-w},{x:CX+3*w, y: CY-2*w}, {x: CX+3*w, y: CY}, {x: CX+2*w, y:CY+w}, {x:CX, y:CY+w}],{fill:'rgba(30,30,30,0.4)'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);



              	 if (points[i].line1.outs_mil2[k-1]==1)
                 {

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*2-fairytail+5,
                   	fill: 'white'});


                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	left:lowpoint.left,
                   	top: lowpoint.top-(k-0.5)*delta*2-fairytail-5,
                   	fill: 'white'});

                   	canvas.add(p2,p4);
               	    canvas.bringToFront(p2,p4);
               	    ipblocks.push(p2,p4);

                 }


               }

                fairytail=(points[i].line1.millies4*4+points[i].line1.millies3*3+points[i].line1.millies2*2+0.5*ok)*delta;
             //   console.log ('Отрезок '+points[i].line1.leftpoint+' - '+i+'; Секций на 1000 - '+millies+'; Дельта='+delta+' Верхняя точка: '+points[i].top+'; Нижняя точка: '+lowpoint);
                  // 1000мм.
               for (var k=1; k<=points[i].line1.millies; k++)
               {
               	CX=lowpoint.left-2*w;
                CY=lowpoint.top-k*delta-fairytail;

               	imgObj = new fabric.Polyline([{x:CX, y:CY},{x:CX+2*w,y:CY},{x:CX+3*w,y:CY-w},{x:CX+2*w,y:CY}],{stroke:'#333', fill:'transparent'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               	imgObj = new fabric.Polygon([{x:CX,y:CY-w},{x:CX+2*w,y:CY-w},{x:CX+3*w, y: CY-2*w}, {x: CX+3*w, y: CY}, {x: CX+2*w, y:CY+w}, {x:CX, y:CY+w}],{fill:'rgba(30,30,30,0.4)'});
               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               }

    	   	}

         if (points[i].line1.linetype==1) // горизонтальный
    	   {
           //    console.log ('Отрезок '+i+'; Секций на 4000 - '+points[i].line1.millies4+'; Дельта='+delta+' Правая точка: '+highpoint.left+':'+highpoint.top+'; Левая точка: '+lowpoint.left+':'+lowpoint.top);

                fairytail=0.5*delta*ok;

    	        for (var k=1; k<points[i].line1.millies4; k++)
               {
                  // 4000мм.

                  CX=lowpoint.left+k*delta*4+fairytail;
                  CY=lowpoint.top-4;

                  imgObj = new fabric.Polyline([{x:CX,y:CY+2*w},{x:CX,y:CY},{x:CX+w,y:CY-w},{x:CX,y:CY}],{stroke:'#333', fill:'transparent'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);

               	  imgObj = new fabric.Polygon([{x:CX-w,y:CY+2*w},{x:CX-w, y:CY}, {x:CX, y:CY-w}, {x:CX+2*w, y:CY-w}, {x:CX+w, y:CY}, {x:CX+w, y:CY+2*w}], {fill:'rgba(30,30,30,0.4)'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);

               	  if (points[i].line1.outs_mil4[k-1]==1)
                 {

                    p1=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*4+fairytail+10,
                   	fill: 'white'});

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*4+fairytail+5,
                   	fill: 'white'});

                   	p3=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top:lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*4+fairytail,
                   	fill: 'white'});

                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top:lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*4+fairytail-5,
                   	fill: 'white'});

                   	canvas.add(p1,p2,p3,p4);
               	    canvas.bringToFront(p1,p2,p3,p4);
               	    console.log(p1);
               	    console.log(p2);
               	    console.log(p3);
               	    console.log(p4);
               	    ipblocks.push(p1,p2,p3,p4);

                 }
               }
         //  console.log ('Отрезок '+i+'; Секций на 3000 - '+points[i].line1.millies3+'; Дельта='+delta+' Правая точка: '+highpoint.left+':'+highpoint.top+'; Левая точка: '+lowpoint.left+':'+lowpoint.top);

               fairytail=(points[i].line1.millies4*4+0.5*ok)*delta;
               for (var k=1; k<=points[i].line1.millies3; k++)
               {
                  // 3000мм.
                  CX=lowpoint.left+k*delta*3+fairytail;
                  CY=lowpoint.top-w;

                  imgObj = new fabric.Polyline([{x:CX,y:CY+2*w},{x:CX,y:CY},{x:CX+w,y:CY-w},{x:CX,y:CY}],{stroke:'#333', fill:'transparent'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);

               	  imgObj = new fabric.Polygon([{x:CX-w,y:CY+2*w},{x:CX-w, y:CY}, {x:CX, y:CY-w}, {x:CX+2*w, y:CY-w}, {x:CX+w, y:CY}, {x:CX+w, y:CY+2*w}], {fill:'rgba(30,30,30,0.4)'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);

              if (points[i].line1.outs_mil3[k-1]==1)
                 {

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*3+fairytail+5,
                   	fill: 'white'});

                   	p3=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top:lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*3+fairytail,
                   	fill: 'white'});

                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top:lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*3+fairytail-5,
                   	fill: 'white'});

                   	canvas.add(p2,p3,p4);
               	    canvas.bringToFront(p2,p3,p4);
               	    ipblocks.push(p2,p3,p4);

                 }
               }
        //  console.log ('Отрезок '+i+'; Секций на 2000 - '+points[i].line1.millies2+'; Дельта='+delta+' Правая точка: '+highpoint.left+':'+highpoint.top+'; Левая точка: '+lowpoint.left+':'+lowpoint.top);

               fairytail=(points[i].line1.millies4*4+points[i].line1.millies3*3+0.5*ok)*delta;
               for (var k=1; k<points[i].line1.millies2; k++)
               {

                  CX=lowpoint.left+k*delta*2+fairytail;
                  CY=lowpoint.top-w;

                  imgObj = new fabric.Polyline([{x:CX,y:CY+2*w},{x:CX,y:CY},{x:CX+w,y:CY-w},{x:CX,y:CY}],{stroke:'#333', fill:'transparent'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);

               	  imgObj = new fabric.Polygon([{x:CX-w,y:CY+2*w},{x:CX-w, y:CY}, {x:CX, y:CY-w}, {x:CX+2*w, y:CY-w}, {x:CX+w, y:CY}, {x:CX+w, y:CY+2*w}], {fill:'rgba(30,30,30,0.4)'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);


              if (points[i].line1.outs_mil2[k-1]==1)
                 {

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*2+fairytail+5,
                   	fill: 'white'});

                  	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top:lowpoint.top,
                   	left: lowpoint.left+(k-0.5)*delta*2+fairytail-5,
                   	fill: 'white'});

                   	canvas.add(p2,p4);
               	    canvas.bringToFront(p2,p4);
               	    ipblocks.push(p2,p4);

                 }
               }

               fairytail=(points[i].line1.millies4*4+points[i].line1.millies3*3+points[i].line1.millies2*2+0.5*ok)*delta;
         //     console.log ('Отрезок '+i+'; Секций на 1000 - '+points[i].line1.millies+'; Дельта='+delta+' Правая точка: '+highpoint.left+':'+highpoint.top+'; Левая точка: '+lowpoint.left+':'+lowpoint.top);

               for (var k=1; k<points[i].line1.millies; k++)
               {

                  CX=lowpoint.left+k*delta+fairytail;
                  CY=lowpoint.top-w;

                  imgObj = new fabric.Polyline([{x:CX,y:CY+2*w},{x:CX,y:CY},{x:CX+w,y:CY-w},{x:CX,y:CY}],{stroke:'#333', fill:'transparent'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);

               	  imgObj = new fabric.Polygon([{x:CX-w,y:CY+2*w},{x:CX-w, y:CY}, {x:CX, y:CY-w}, {x:CX+2*w, y:CY-w}, {x:CX+w, y:CY}, {x:CX+w, y:CY+2*w}], {fill:'rgba(30,30,30,0.4)'});
                  canvas.add(imgObj);
               	  canvas.bringToFront(imgObj);
               	  ipblocks.push(imgObj);


              }


         }
         if (points[i].line1.linetype==3) // диагональный
    	   {

               fairytail=0.5*delta*ok/Math.sqrt(2);
               // 4000 mm
    	       for (var k=1; k<=points[i].line1.millies4; k++)
               {
               CY=lowpoint.top-k*delta*4/Math.sqrt(2)-fairytail;
               CX=lowpoint.left+k*delta*4/Math.sqrt(2)+fairytail;

               imgObj=new fabric.Polyline([{x:CX, y:CY+w},{x:CX,y:CY-1.5*w},{x:CX-2*w,y:CY-1.5*w},{x:CX,y:CY-1.5*w}],{stroke:'#333', fill:'transparent'});

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               imgObj=new fabric.Polygon([{x:CX-w, y:CY+2*w}, {x:CX-w, y:CY-0.5*w}, {x:CX-3*w, y:CY-0.5*w}, {x:CX-w, y:CY-2*w}, {x:CX+w, y:CY-2*w}, {x:CX+w, y:CY+0.5*w}],{fill:'rgba(30,30,30,0.4)'})

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);


               	 if (points[i].line1.outs_mil4[k-1]==1)
                 {

                    p1=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*4/Math.sqrt(2)-fairytail+10,
                   	left: lowpoint.left+(k-0.5)*delta*4/Math.sqrt(2)+fairytail-10,
                   	fill: 'white'});

                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*4/Math.sqrt(2)-fairytail+5,
                   	left: lowpoint.left+(k-0.5)*delta*4/Math.sqrt(2)+fairytail-5,
                   	fill: 'white'});

                   	p3=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*4/Math.sqrt(2)-fairytail,
                   	left: lowpoint.left+(k-0.5)*delta*4/Math.sqrt(2)+fairytail,
                   	fill: 'white'});

                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*4/Math.sqrt(2)-fairytail-5,
                   	left: lowpoint.left+(k-0.5)*delta*4/Math.sqrt(2)+fairytail+5,
                   	fill: 'white'});

                   	canvas.add(p1,p2,p3,p4);
               	    canvas.bringToFront(p1,p2,p3,p4);
               	    console.log(p1);
               	    console.log(p2);
               	    console.log(p3);
               	    console.log(p4);
               	    ipblocks.push(p1,p2,p3,p4);

                 }

               }

               fairytail=(points[i].line1.millies4*4*delta+0.5*delta*ok)/Math.sqrt(2);
                // 3000mm
               for (var k=1; k<=points[i].line1.millies3; k++)
               {
               CY=lowpoint.top-k*delta*3/Math.sqrt(2)-fairytail;
               CX=lowpoint.left+k*delta*3/Math.sqrt(2)+fairytail;

               imgObj=new fabric.Polyline([{x:CX, y:CY+w},{x:CX,y:CY-1.5*w},{x:CX-2*w,y:CY-1.5*w},{x:CX,y:CY-1.5*w}],{stroke:'#333', fill:'transparent'});

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               imgObj=new fabric.Polygon([{x:CX-w, y:CY+2*w}, {x:CX-w, y:CY-0.5*w}, {x:CX-3*w, y:CY-0.5*w}, {x:CX-w, y:CY-2*w}, {x:CX+w, y:CY-2*w}, {x:CX+w, y:CY+0.5*w}],{fill:'rgba(30,30,30,0.4)'})

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);


               	 	 if (points[i].line1.outs_mil3[k-1]==1)
                 {


                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*3/Math.sqrt(2)-fairytail+5,
                   	left: lowpoint.left+(k-0.5)*delta*3/Math.sqrt(2)+fairytail-5,
                   	fill: 'white'});

                   	p3=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*3/Math.sqrt(2)-fairytail,
                   	left: lowpoint.left+(k-0.5)*delta*3/Math.sqrt(2)+fairytail,
                   	fill: 'white'});

                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*3/Math.sqrt(2)-fairytail-5,
                   	left: lowpoint.left+(k-0.5)*delta*3/Math.sqrt(2)+fairytail+5,
                   	fill: 'white'});

                   	canvas.add(p2,p3,p4);
               	    canvas.bringToFront(p2,p3,p4);
               	    ipblocks.push(p2,p3,p4);

                 }

               }

               fairytail=(points[i].line1.millies4*4*delta+points[i].line1.millies3*3*delta+0.5*delta*ok)/Math.sqrt(2);
               // 2000mm.
               for (var k=1; k<=points[i].line1.millies2; k++)
               {
               CY=lowpoint.top-k*delta*2/Math.sqrt(2)-fairytail;
               CX=lowpoint.left+k*delta*2/Math.sqrt(2)+fairytail;

               imgObj=new fabric.Polyline([{x:CX, y:CY+w},{x:CX,y:CY-1.5*w},{x:CX-2*w,y:CY-1.5*w},{x:CX,y:CY-1.5*w}],{stroke:'#333', fill:'transparent'});

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               imgObj=new fabric.Polygon([{x:CX-w, y:CY+2*w}, {x:CX-w, y:CY-0.5*w}, {x:CX-3*w, y:CY-0.5*w}, {x:CX-w, y:CY-2*w}, {x:CX+w, y:CY-2*w}, {x:CX+w, y:CY+0.5*w}],{fill:'rgba(30,30,30,0.4)'})

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

              	if (points[i].line1.outs_mil2[k-1]==1)
                 {


                   	p2=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*2/Math.sqrt(2)-fairytail+5,
                   	left: lowpoint.left+(k-0.5)*delta*2/Math.sqrt(2)+fairytail-5,
                   	fill: 'white'});


                   	p4=new fabric.Circle({
                   	originX:'center',
                   	originY:'center',
                   	radius: 2,
                   	top: lowpoint.top-(k-0.5)*delta*2/Math.sqrt(2)-fairytail-5,
                   	left: lowpoint.left+(k-0.5)*delta*2/Math.sqrt(2)+fairytail+5,
                   	fill: 'white'});

                   	canvas.add(p2,p4);
               	    canvas.bringToFront(p2,p4);
               	    ipblocks.push(p2,p4);

                 }

               }

               fairytail=(points[i].line1.millies4*4*delta+points[i].line1.millies3*3*delta+points[i].line1.millies2*delta*2+0.5*delta*ok)/Math.sqrt(2);
              //  console.log ('Отрезок '+points[i].line1.leftpoint+' - '+i+'; Секций на 1000 - '+millies+'; Дельта='+delta+' Верхняя точка: '+points[i].top+'; Нижняя точка: '+lowpoint);
               // 1000mm
               for (var k=1; k<=points[i].line1.millies; k++)
               {
               CY=lowpoint.top-k*delta/Math.sqrt(2)-fairytail;
               CX=lowpoint.left+k*delta/Math.sqrt(2)+fairytail;

               imgObj=new fabric.Polyline([{x:CX, y:CY+w},{x:CX,y:CY-1.5*w},{x:CX-2*w,y:CY-1.5*w},{x:CX,y:CY-1.5*w}],{stroke:'#333', fill:'transparent'});

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               imgObj=new fabric.Polygon([{x:CX-w, y:CY+2*w}, {x:CX-w, y:CY-0.5*w}, {x:CX-3*w, y:CY-0.5*w}, {x:CX-w, y:CY-2*w}, {x:CX+w, y:CY-2*w}, {x:CX+w, y:CY+0.5*w}],{fill:'rgba(30,30,30,0.4)'})

               	canvas.add(imgObj);
               	canvas.bringToFront(imgObj);
               	ipblocks.push(imgObj);

               }


            }


         points[i].line1.ipblocks=ipblocks;



       //  points[0].ipblocks=ipblocks;


      }

    // Посчитать кол-во отрезков шинопровода заданной длины и вывести в табличку. Инфу об отрезках берёт из div id=sizesubmit
     /////////////////////////////////////////////////////////
    //                                                     //
   //        Р А С С Ч Ё Т   О Т Р Е З К О В              //
  //                                                     //
 /////////////////////////////////////////////////////////
    function CountPieces()
    {
         pushButton('countPieces', 'edit', 'erase', 'ruler', 'draw', 'savePicture');

          document.getElementById('hint_top').style.display='block';
          document.getElementById('hint_top').innerHTML='Режим рассчёта фрагментов шинопровода. Кликайте по рёбрам шинопровода и редактируйте разметку';

          var table=document.getElementById('sizesubmit'),
          sz4=document.getElementById('sz4'),
          sz3=document.getElementById('sz3'),
          sz2=document.getElementById('sz2'),
          sz1=document.getElementById('sz1');
          table.style.display="none";


          /*

            // Добавить общую длину шинопровода


            !! есть только у line1
               points[k].line1.millies4 - отрезков шинопровода по 4000 мм
               points[k].line1.millies3 - отрезков шинопровода по 3000 мм
               points[k].line1.millies2 - отрезков шинопровода по 2000 мм
               points[k].line1.millies - отрезков шинопровода по 1000 мм
               points[k].line1.rest - длина нестандартного отрезка шинопровода в мм

               points[k].angle_type = 0 - не угол (начало/конец отрезка)
                                    = 1 - горизонтальный
                                    = 2 - вертикальный
                                    = 3 - тройник горизонтальный
                                    = 4 - тройник вертикальный
                                    = 5 - крестовина
               points[k].angle_side01 - к линии Line1
               points[k].angle_side02 - к линии Line2
               points[k].angle_side03 - к линии Line3
               points[k].angle_side04 - к линии Line4
                                      = число, плечо угла
               points[k].endtype - тип конца: Трансформатор, фланцевый конец, заглушка, кабельный ввод

          */

           //всего отрезков на участке
           var inwhole,
           // соединительных блоков
           blocks,

            // пропорция между пикселями и милиметрами
            delta,
            // для нестандартных углов
            line,
            // так мы выбираем какие линии сравнивать
            line1,
            line2,
            line3,

            // нижняя (левая) точка отрезка
            lowpoint,
            // верхняя (правая) точка отрезка - нужно когда вычисляешь угол для вертикального отрезка
            highpoint,
            // счётчик
            k,
            // высота блока - один раз вычислили и потом пользуемся
            blockheight,
            // хвост феи
            fairytail,
            // если вершина не висячая ok=1
            ok,
            // что осталось от отрезка когда мы убрали от него по 500 мм на углы
            otrezok,
            // что осталось от отрезка, когда мы его разделили на секции
            pieces=Array();

        if (points[1].line1.sm)
        {

      // console.log('4000: '+sz4.value+'; 3000: '+sz3.value+'; 2000: '+sz2.value+"; 1000:"+sz1.value);

        var pictures=[];
        var imgObj;

      //рисуем тупичок вместо первой точки
       points[0].set('fill', 'transparent');
       points[0].set('stroke', 'transparent');

              { CX=points[0].x;
                CY=points[0].y;
                var tupik;
                // Тип №1 вертикальный вниз
              	if ((points[0].line2.linetype==2)&&(points[0].line2.side==1))
              	   {
              	    CX=CX-w;
              	   	tupik = new fabric.Polyline([{x:CX-w, y:CY},{x:CX+w,y:CY},{x:CX+2*w,y:CY-w}],{stroke:'#333', strokeWidth: 2, fill:'transparent'});

              	   }
              	// Тип №2 горизонтальный влево
              	if ((points[0].line2.linetype==1)&&(points[0].line2.side==1))
              	   {
              	   	tupik = new fabric.Polyline([{x:CX, y:CY+w},{x:CX,y:CY-w},{x:CX+w,y:CY-2*w}],{stroke:'#333', strokeWidth: 2, fill:'transparent'});
              	    	   }

              	// Тип №3 диагональный вперёд
               if ((points[0].line2.linetype==3)&&(points[0].line2.side==-1))
                {
              	   	tupik = new fabric.Polyline([{x:CX-w, y:CY},{x:CX+w,y:CY},{x:CX+w,y:CY+w}],{stroke:'#333', strokeWidth: 2, fill:'transparent'});

              	   }

               // Тип №4 вертикальный вверх
               if ((points[0].line2.linetype==2)&&(points[0].line2.side==-1))
              	   {
              	    CX=CX-w;
              	    CY=CY+w*1.5;
                   tupik = new fabric.Polygon([{x: CX-w,y:CY},
                                               {x: CX,y:CY-w},
                                               {x: CX+2*w,y:CY-w},
                                               {x: CX+w,y:CY}],
                                              {fill: '#018080', stroke: '#333' });
                                              }

              // Тип №5 горизонтальный вправо
              if ((points[0].line2.linetype==1)&&(points[0].line2.side==-1))
              	  { CX=CX-w;
                   tupik = new fabric.Polygon([{x: CX,y:CY-w},
                                               {x: CX+w,y:CY-2*w},
                                               {x: CX+w,y:CY},
                                               {x: CX,y:CY+w}],
                                              {fill: '#018080', stroke: '#333' });
                                              }

              // Тип №6 диагональный назад
              if ((points[0].line2.linetype==3)&&(points[0].line2.side==1))
              	   {

              	   CX=CX-0.3*w;
              	   CY=CY-w;
                   tupik = new fabric.Polygon([{x: CX-0.8*w,y:CY-w},
                                               {x: CX+0.8*w,y:CY-w},
                                               {x: CX+0.8*w,y:CY+1.5*w},
                                               {x: CX-0.8*w,y:CY+1.5*w}],
                                              {fill: '#5bd6d6', stroke: '#333' });
                                              }

                  tupik.set('selectable',false);
                  points[0].tupik=tupik;
                  canvas.add(points[0].tupik);
                  canvas.bringToFront(points[0].tupik);
                  canvas.renderAll();
              }


        for (var i=1; i<points.length; i++)
        {
        	      //  рисуем рёбрышки
          if (points[i].line1)
           {
             x1=points[i].line1.x1;
             x2=points[i].line1.x2;
             y1=points[i].line1.y1;
             y2=points[i].line1.y2;
           	if (points[i].line1.linetype==1)
           	  {
           	  	 var rebro1=new fabric.Line([x1,y1-0.5*w,x2,y1-0.5*w],{stroke: '#333', strokeWidth: 1});
           	  	 var rebro2=new fabric.Line([x1,y1+0.5*w,x2,y1+0.5*w],{stroke: '#333', strokeWidth: 1});
           	  	 var rebro3=new fabric.Line([x1,y1+2.5*w,x2,y1+2.5*w],{stroke: '#333', strokeWidth: 1});
           	  }

           	if (points[i].line1.linetype==2)
           	  {
           	  	 var rebro1=new fabric.Line([x1+2*w,y1,x2+2*w,y2],{stroke: '#333', strokeWidth: 1});
           	  	 var rebro2=new fabric.Line([x1+w,y1,x2+w,y2],{stroke: '#333', strokeWidth: 2});
           	  	 var rebro3=new fabric.Line([x1-w,y1,x2-w,y2],{stroke: '#333', strokeWidth: 1});
           	  }
            if (points[i].line1.linetype==3)
           	  {
           	  	 var rebro1=new fabric.Line([x1+0.5*w-2,y1+0.5*w-2,x2+0.5*w-2,y2+0.5*w-2],{stroke: '#333', strokeWidth: 2});
           	  	 var rebro2=new fabric.Line([x1-0.5*w,y1-0.5*w,x2-0.5*w,y2-0.5*w],{stroke: '#333', strokeWidth: 1});
           	  	 var rebro3=new fabric.Line([x1+1.5*w,y1+1.5*w,x2+1.5*w,y2+1.5*w],{stroke: '#333', strokeWidth: 1});
           	  }
           	  rebro1.set('selectable', false);
           	  rebro2.set('selectable', false);
           	  rebro3.set('selectable', false);
           	  points[i].rebro1=rebro1;
           	  points[i].rebro2=rebro2;
           	  points[i].rebro3=rebro3;
           	  canvas.add(points[i].rebro3, points[i].rebro1, points[i].rebro2);

           }

        }

    	for (var i=1; i<points.length; i++)
    	{
           var outs=new Array();
           outs[0]=0;
           points[i].line1.outs_mil4=new Array();
           points[i].line1.outs_mil3=new Array();
           points[i].line1.outs_mil2=new Array();
           points[i].line1.outs_rest=new Array();
           points[i].line1.ipblocks=[];


         ok=0; // изначально мы считаем, что вершина висячая

         // отрезали на углы
         console.log(points[i].angle_side01);
         if ((i==1)||((!points[i].line2)&&(!points[i].line3)&&(!points[i].line4)))
          {
            if ((points[i].angle_side01)&&(points[i].angle_side01!=500))
          	otrezok=points[i].line1.sm-points[i].angle_side01;
          	else
          	  otrezok=points[i].line1.sm-500;

          	}
         else
          {
          	if ((points[i].angle_side01)&&(points[i].angle_side01!=500))
          	otrezok=points[i].line1.sm-points[i].angle_side01-500;
          	else
            	otrezok=points[i].line1.sm-1000;
          	 }

         // определить какой угол

         // двойничок
         if (((points[i].line1)&&(points[i].line2)&&(!points[i].line3)&&(!points[i].line4))||
            ((points[i].line1)&&(points[i].line3)&&(!points[i].line2)&&(!points[i].line4))||
            ((points[i].line1)&&(points[i].line4)&&(!points[i].line2)&&(!points[i].line3)))
            {
              // у нас есть только две линии
              line1=points[i].line1;
              if (points[i].line2) line2=points[i].line2;
              else
                 {
                   if (points[i].line3) line2=points[i].line3;
                    else
                       line2=points[i].line4;
                  }


             if (((line1.linetype==1)&&(line2.linetype==3))||((line1.linetype==3)&&(line2.linetype==1)))
               {
               	// горизонтальный
                points[i].angle_type=1;
                points[i].angle_side01=500;
                points[i].angle_side02=500;

                }
             else
               {
                if (((line1.linetype==2)&&(line2.linetype==1))||((line1.linetype==1)&&(line2.linetype==2))||((line1.linetype==2)&&(line2.linetype==3))||((line1.linetype==3)&&(line2.linetype==2)))
                {
                // вертикальный
                points[i].angle_type=2;
                points[i].angle_side01=500;
                points[i].angle_side02=500;

                }
               }

               }

         else
         // тройничок
                  {
                 if (((points[i].line2)&&(points[i].line3)&&(!points[i].line4))||
                     ((points[i].line2)&&(!points[i].line3)&&(points[i].line4))||
                     ((!points[i].line2)&&(points[i].line3)&&(points[i].line4)))

                   {
                  	points[i].angle_side01=500;
                    points[i].angle_side02=500;
                    points[i].angle_side03=500;

                    // определимся какая линия первая, вторая и третья
                    line1=points[i].line1;
                    if (points[i].line2)
                        {
                        	line2=points[i].line2;
                        	if (points[i].line3)
                        	   line3=points[i].line3;
                        	     else line3=points[i].line4;
                        	}
                    else
                       {
                       	line2=points[i].line3;
                       	line3=points[i].line4;
                       }

                    // определимся вертикальный или горизонтальный
                      if (((line1.linetype==1)&&(line2.linetype==1)&&(line3.linetype==3))||
                          ((line1.linetype==1)&&(line3.linetype==1)&&(line2.linetype==3))||
                          ((line2.linetype==1)&&(line3.linetype==1)&&(line1.linetype==3))||
                          ((line1.linetype==3)&&(line2.linetype==3)&&(line3.linetype==1))||
                          ((line1.linetype==3)&&(line3.linetype==3)&&(line2.linetype==1))||
                          ((line2.linetype==3)&&(line3.linetype==3)&&(line1.linetype==1)))
                          points[i].angle_type=3;
                     else points[i].angle_type=4;

                    }
                  else

                  {  // крестовина
                  	if ((points[i].line1)&&(points[i].line2)&&(points[i].line3)&&(points[i].line4))
                  	    {
                  	    	if (((points[i].line1.linetype==points[i].line2.linetype)&&(points[i].line3.linetype==points[i].line4.linetype)&&(points[i].line1.linetype!=points[i].line3.linetype))||
                  	    	    ((points[i].line1.linetype==points[i].line3.linetype)&&(points[i].line2.linetype==points[i].line4.linetype)&&(points[i].line1.linetype!=points[i].line2.linetype))||
                  	    	    ((points[i].line1.linetype==points[i].line4.linetype)&&(points[i].line2.linetype==points[i].line3.linetype)&&(points[i].line1.linetype!=points[i].line2.linetype)))
                  	    	{
                  	    		points[i].angle_type=5;
                  	    		points[i].angle_side01=500;
			                    points[i].angle_side02=500;
			                    points[i].angle_side03=500;
                                points[i].angle_side04=500;

                  	    		}
                  	       }
                      }

                  }

          // Убрать в угол!
         if (otrezok<=500)

            {
            	console.log('На участке '+points[i].line1.leftpoint+' - '+i+' некорректный размер: '+otrezok+'; минимально допустимый размер - 501мм');
            	if ((points[i].line2)&&(!points[i].line3)&&(!points[i].line4))
            	   line=points[i].line2;
            	if ((points[i].line3)&&(!points[i].line2)&&(!points[i].line4))
            	   line=points[i].line3;
            	if ((points[i].line4)&&(!points[i].line2)&&(!points[i].line3))
            	   line=points[i].line4;

                if ((points[points[i].line1.leftpoint].line1.linetype!=points[i].line1.linetype)&&(line.linetype!=points[i].line1.linetype))
                   {
                   	points[i].line1.zangle=1;
                   	points[i].angle_type=6;
                   	points[points[i].line1.leftpoint].angle_type=6;
                   	points[points[i].line1.leftpoint].angle_side01=500;
                   	points[i].angle_side02=500;
                    points[i].line1.millies4=0;
                   	points[i].line1.millies3=0;
                   	points[i].line1.millies2=0;
                   	points[i].line1.millies=0;
                   	}
                }
         else
         { if (otrezok<1000)
           {
           	  points[i].line1.rest=otrezok;
           	  console.log('Весь отрезок '+i+' нестандартной длины');
           	  points[i].line1.millies4=0;
              points[i].line1.millies3=0;
           	  points[i].line1.millies2=0;
           	  points[i].line1.millies=0;
           }
           else
           {

           console.log(i+'. Длина отрезка: '+otrezok);
           points[i].line1.millies4=Math.floor(otrezok/4000)*sz4.value;
           points[i].line1.millies3=Math.floor((otrezok-points[i].line1.millies4*4000)/3000)*sz3.value;
           points[i].line1.millies2=Math.floor((otrezok-points[i].line1.millies4*4000-points[i].line1.millies3*3000)/2000)*sz2.value;
           points[i].line1.millies=Math.floor((otrezok-points[i].line1.millies4*4000-points[i].line1.millies3*3000-points[i].line1.millies2*2000)/1000)*sz1.value;
           console.log('4000:'+points[i].line1.millies4+'; 3000:'+points[i].line1.millies3+'; 2000:'+points[i].line1.millies2+'; 1000:'+points[i].line1.millies);

           if (points[i].line1.millies4>0)
             for (var k=0; k<points[i].line1.millies4; k++)
                	points[i].line1.outs_mil4[k]=0;


           if (points[i].line1.millies3>0)
              for (var k=0; k<points[i].line1.millies3; k++)
                points[i].line1.outs_mil3[k]=0;



           if (points[i].line1.millies2>0)
             for (var k=0; k<points[i].line1.millies2; k++)
                	points[i].line1.outs_mil2[k]=0;

        /* millies15=Math.floor((otrezok-millies4*4000-millies3*3000-millies2*2000)/1500)*sz1.value;
         mvariant1[4]+=millies15;
          */

         // считаем что осталось
          if (otrezok-Math.floor(otrezok/1000)*1000)
           {
             points[i].line1.rest=otrezok-Math.floor(otrezok/1000)*1000;
             points[i].line1.rest=points[i].line1.rest.toFixed();
             }
             }
            }

          showBlocks(points, i);

         }

           showTable(points);

           place.removeEventListener('click', rulerSet, false);
           place.addEventListener('click', showFragment,false);



        }

        else console.log ('Вы ещё не задали размеры');
     }

    // Пользователь выбрал пересчёт отрезков шинопровода. Инфу об отрезках берёт из div id=fragment_check
    // Номер отрезка=номер вершины, для которой отрезок line1 спрятан в input div=point_id

   function ChangePieces()
   {
        var sz4=document.getElementById('mil4').value,
         sz3=document.getElementById('mil3').value,
         sz2=document.getElementById('mil2').value,
         sz=document.getElementById('mil').value,
         id=document.getElementById('point_id').value,
         otrezok;

    // console.log('Изменение отрезков');
      /*
      points[id].line1.stroke='rgba(45,109, 121,1.0)';
      points[id].line1.line1.stroke='rgba(45,109, 121,1.0)';
      points[id].line1.line2.stroke='rgba(45,109, 121,1.0)';
      canvas.renderAll();
        */
     if ((id==1)||((!points[id].line2)&&(!points[id].line3)&&(!points[id].line4)))
          {
          	otrezok=points[id].line1.sm-points[id].angle_side01;

          	}
         else
          {
          	otrezok=points[id].line1.sm-points[id].angle_side01-500 ;
          	 }
     // console.log(otrezok+'угол 1:'+ points[id].angle_side01);

      if (otrezok>1000)
         {
           var millies4=Math.floor(otrezok/4000)*sz4;
           var millies3=Math.floor((otrezok-millies4*4000)/3000)*sz3;
           var millies2=Math.floor((otrezok-millies4*4000-millies3*3000)/2000)*sz2;
           var millies=Math.floor((otrezok-millies4*4000-millies3*3000-millies2*2000)/1000)*sz;


            if (points[id].line1.millies4>0)
             for (var k=0; k<points[id].line1.millies4; k++)
                	points[id].line1.outs_mil4[k]=0;


           if (points[id].line1.millies3>0)
              for (var k=0; k<points[id].line1.millies3; k++)
                points[id].line1.outs_mil3[k]=0;



           if (points[id].line1.millies2>0)
             for (var k=0; k<points[id].line1.millies2; k++)
                	points[id].line1.outs_mil2[k]=0;

           console.log('Отрезок '+otrezok+' состоит из:'+sz4+'*'+millies4+' ; '+sz3+'*'+millies3+' ; '+sz2+'*'+millies2+' ; '+sz+'*'+millies);

           document.getElementById('hint_span').style.display='block';
           document.getElementById('hint_span').innerHTML='Не забудьте сохранить свой выбор! Если у вас были участки на отводах - информация о них сброшена';

           if (millies4>0)
              {
                 document.getElementById('mil4_val').value=millies4;
                 document.getElementById('mil4_val').innerHTML=millies4;

                 }
                 else
                 {
                  document.getElementById('mil4_val').value=0;
                  document.getElementById('mil4_val').innerHTML="-";

                 }
              if (millies3>0)
              {
                 document.getElementById('mil3_val').value=millies3;
                 document.getElementById('mil3_val').innerHTML=millies3;

                 }
                 else
                 {
                   document.getElementById('mil3_val').value=0;
                   document.getElementById('mil3_val').innerHTML="-";

                 }
              if (millies2>0)
              {
                 document.getElementById('mil2_val').value=millies2;
                 document.getElementById('mil2_val').innerHTML=millies2;


                 }
                  else
                 {
                 document.getElementById('mil2_val').value=0;
                 document.getElementById('mil2_val').innerHTML="-";

                 }
              if (millies>0)
              {
                 document.getElementById('mil_val').value=millies;
                 document.getElementById('mil_val').innerHTML=millies;


                 }
                  else
                 {
                  document.getElementById('mil_val').value=0;
                  document.getElementById('mil_val').innerHTML="-";

                 }


           // Меняем инфу в табличке
         /*
           1. Добавить к табличке скрытые value для каждой из характрепистик
           2. Менять так: if ((sz_k!=0)||(value_k!=0))
                              innerHTML=value_k-points[id].millies_k+millies_k;  (и новое value_k тоже)
           */
          }

   }

   function ProcessResult()
    {
      document.getElementById('hint_top').style.display='block';
      document.getElementById('hint_top').innerHTML='Режим записи макета. Сейчас вы попадёте на страницу сохранения';

     var form=document.getElementById('shino');
     form.action="process.php";
     var allsections=0,
         has_flanz=0,
         has_trans=0,
         has_cable=0,
         zaglushkas=0,
         z=0,
         angles=0,
         millies4000=0,
         millies3000=0,
         millies2000=0,
         millies1000=0,
         millies4000_o=0,
         millies3000_o=0,
         millies2000_o=0,
         angle_ver=0,
         angle_ver_spec=0,
         angle_hor=0,
         angle_hor_spec=0,
         angle_triple_ver=0,
         angle_triple_ver_spec=0,
         angle_triple_hor=0,
         angle_triple_hor_spec=0,
         angle_quadro=0,
         angle_quadro_spec=0,
         zangle=0,

         rests=0;
        // millies1500_o=0,

     var newinput;
     var z=0;
      // Обрабатываем первую вершину
      if (points[0].endtype=='Фланцевый вывод')
     	       {

     	        newinput=document.createElement('input');
                newinput.name='flanzend_'+has_flanz;
                newinput.setAttribute('value',0);
                form.appendChild(newinput);
                has_flanz++;

     	          }
     	    if (points[0].endtype=='Трансформатор')
     	      {
     	        newinput=document.createElement('input');
                newinput.name='transend_'+has_trans;
                newinput.setAttribute('value',0);
                form.appendChild(newinput);
                has_trans++;
     	          }

     	    if (points[0].endtype=='Кабельный ввод')
     	     {
               newinput=document.createElement('input');
                newinput.name='cablend_'+has_cable;
                newinput.setAttribute('value',0);
                form.appendChild(newinput);
     	       has_cable++;
              }

            if (points[0].endtype=='Заглушка')
              {
              	newinput=document.createElement('input');
                newinput.name='zaglushkaend_'+zaglushkas;
                newinput.setAttribute('value',0);
                form.appendChild(newinput);
                zaglushkas++;
              }

     for (var i=1; i<points.length; i++)
     {

          // Включаем номера вершин на картинке
        	points[i].set('fill','green');
        	if (!points[i].text)
        	 {
        	  text=new fabric.Text('№ '+i, {left: points[i].left+10, top: points[i].top, fontSize: 14, fontFamily: 'Century Gothic'});
              points[i].text=text;
        	  points[i].text.selectable=false;
        	   }
        	canvas.add(points[i].text);

	     	//Пересчитываем концы

     	    if (points[i].endtype=='Фланцевый вывод')
     	       {

     	        newinput=document.createElement('input');
                newinput.name='flanzend_'+has_flanz;
                newinput.setAttribute('value',i);
                form.appendChild(newinput);
                has_flanz++;

     	          }
     	    if (points[i].endtype=='Трансформатор')
     	      {
     	        newinput=document.createElement('input');
                newinput.name='transend_'+has_trans;
                newinput.setAttribute('value',i);
                form.appendChild(newinput);
                has_trans++;
     	          }

     	    if (points[i].endtype=='Кабельный ввод')
     	     {
               newinput=document.createElement('input');
                newinput.name='cablend_'+has_cable;
                newinput.setAttribute('value',i);
                form.appendChild(newinput);
     	       has_cable++;
              }

            if (points[i].endtype=='Заглушка')
                     zaglushkas++;



        // Пересчитываем отрезки с отводами и без
        if (points[i].line1.millies4!=0)
           {
           	for (var k=0; k<points[i].line1.millies4; k++)
           	{
           	 if (points[i].line1.outs_mil4[k]==0)
               millies4000++;
             else
               millies4000_o++;
           	}
           }

         if (points[i].line1.millies3!=0)
           {
           	for (var k=0; k<points[i].line1.millies3; k++)
           {
           	 if (points[i].line1.outs_mil3[k]==0)
               millies3000++;
             else
               millies3000_o++;
           	}
           }

         if (points[i].line1.millies2!=0)
           {
           	for (var k=0; k<points[i].line1.millies2; k++)
           	{
           	 if (points[i].line1.outs_mil2[k]==0)
               millies2000++;
             else
               millies2000_o++;
           	}
           }

         if (points[i].line1.millies!=0)

           	millies1000+=points[i].line1.millies;


         if (points[i].line1.rest>0)
          {
            if (points[i].line1.rest<500)
             {
              points[i].angle_side01=parseInt(points[i].angle_side01,10)+parseInt(points[i].line1.rest,10);
              points[i].line1.rest=0;

	          for (var k=0; k<points[i].line1.ipblocks.length; k++)
		           {
		              canvas.remove(points[i].line1.ipblocks[k]);
		               }

		     points[i].line1.ipblocks=[];
		     canvas.renderAll();
		     showBlocks(points, i);
		             }
              else
              {
	             newinput=document.createElement('input');
	             newinput.name='restid_'+rests;
	             newinput.setAttribute('value',points[i].line1.rest);
	             rests++;
	             form.appendChild(newinput);
	             }
          }

        // Пересчитываем углы 1 - горизонтальный, 2 - вертикальный, 3 - тройник горизонтальный, 4 - тройник вертикальный, 5 - крестовина, 6 - зигзуг
           if (points[i].angle_type==2)
             {
             if (points[i].angle_side01==500)
                  angle_ver++; // 34. Угол вертикальный - их мы просто считаем
                else
                  {

	              	newinput=document.createElement('input');
	                newinput.name='angle_ver_spec_'+angle_ver_spec;
	                newinput.setAttribute('value',points[i].angle_side01);
	                form.appendChild(newinput);

                  	angle_ver_spec++;   // 35. Угол вертикальный специальный - их считаем с размерами

                  }
              }
           if (points[i].angle_type==1)
               {
                if (points[i].angle_side01==500)     // 31 Угол горизонтальный N1
                  {                                  // 32 Угол горизонтальный N2 - собираем номера вершин для выбора
                  	newinput=document.createElement('input');
	                newinput.name='angle_hor_'+angle_hor;
	                newinput.setAttribute('value',i);
	                form.appendChild(newinput);
                  	angle_hor++;
                  	}
                else
                  {                                    // 33 Угол горизонтальный специальный - собираем размеры угла
                  	newinput=document.createElement('input');
	                newinput.name='angle_hor_spec_'+angle_hor_spec;
	                newinput.setAttribute('value',points[i].angle_side01);
	                form.appendChild(newinput);

                  	angle_hor_spec++;
                  }
              }
           if (points[i].angle_type==3)
              {
               if (points[i].angle_side01==500)
                  angle_triple_hor++;    // 41 Угол тройной специальный горизонтальный те, что 500х500х500 просто считаем количество
                else
                  {                      // 41 Угол тройной специальный с нестандартными размерами - запоминаем нестандартный размер
                    newinput=document.createElement('input');
	                newinput.name='angle_triple_hor_spec_'+angle_triple_hor_spec;
	                newinput.setAttribute('value',points[i].angle_side01);
	                form.appendChild(newinput);
                  	angle_triple_hor_spec++;

                  }
              	}
           if (points[i].angle_type==4)
               {
              if (points[i].angle_side01==500)
                  angle_triple_ver++;    // 42 Угол тройной специальный вертикальный - те, что 500х500х500 просто считаем количество
                else
                  {                      // 42 Угол тройной специальный с нестандартными размерами - запоминаем нестандартный размер
                    newinput=document.createElement('input');
	                newinput.name='angle_triple_ver_spec_'+angle_triple_ver_spec;
	                newinput.setAttribute('value',points[i].angle_side01);
	                form.appendChild(newinput);
                  	angle_triple_ver_spec++;

                  }
              	}
           if (points[i].angle_type==5)
               {

                if (points[i].angle_side01==500)     // 43 Крествина горизонтальная или
                  {                                  // 44 Крестовина вертикальная стандартных размеров - собираем номера вершин для выбора
                  	newinput=document.createElement('input');
	                newinput.name='angle_quadro_'+angle_quadro;
	                newinput.setAttribute('value',i);
	                form.appendChild(newinput);
                  	angle_quadro++;
                  	}
                else                                  // 43 Крествина горизонтальная или
                  {                                  // 44 Крестовина вертикальная НЕстандартных размеров - собираем номера вершин для выбора
                  	newinput=document.createElement('input');
	                newinput.name='angle_quadro_spec_'+angle_quadro_spec;
	                newinput.setAttribute('value',i);
	                form.appendChild(newinput);

                  	angle_quadro_spec++;
                  }

              	}

           if ((points[i].angle_type==6)&&(points[i].line1.zangle==1))
              {
                                                // 39 Угол двойной специальный - собираем размеры зигзугов
                  	newinput=document.createElement('input');
	                newinput.name='zangle_'+zangle;
	                newinput.setAttribute('value',points[i].line1.sm);
	                form.appendChild(newinput);
                  	zangle++;
              	}




     }


        // Записываем концы

            newinput=document.createElement('input');
            newinput.name='has_flanz';
            newinput.setAttribute('value',has_flanz);
            form.appendChild(newinput);


            newinput=document.createElement('input');
            newinput.name='has_trans';
            newinput.setAttribute('value',has_trans);
            form.appendChild(newinput);


            newinput=document.createElement('input');
            newinput.name='has_cable';
            newinput.setAttribute('value',has_cable);
            form.appendChild(newinput);


            newinput=document.createElement('input');
            newinput.name='zaglushkas';
            newinput.setAttribute('value',zaglushkas);
            form.appendChild(newinput);

         // Записываем отрезки с отводами и без

            newinput=document.createElement('input');
            newinput.name='millies4000';
            newinput.setAttribute('value',millies4000);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='millies4000_o';
            newinput.setAttribute('value',millies4000_o);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='millies3000';
            newinput.setAttribute('value',millies3000);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='millies3000_o';
            newinput.setAttribute('value',millies3000_o);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='millies2000';
            newinput.setAttribute('value',millies2000);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='millies2000_o';
            newinput.setAttribute('value',millies2000_o);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='millies1000';
            newinput.setAttribute('value',millies1000);
            form.appendChild(newinput);

            newinput=document.createElement('input');
            newinput.name='rests';
            newinput.setAttribute('value',rests);
            form.appendChild(newinput);

            // Записываем углы
            if (zangle>0)
            {
            newinput=document.createElement('input');
            newinput.name='zangle';
            newinput.setAttribute('value',zangle);
            form.appendChild(newinput);
             }
             if (angle_hor>0)
             {
            newinput=document.createElement('input');
            newinput.name='angle_hor';
            newinput.setAttribute('value',angle_hor);
            form.appendChild(newinput);
              }
             if (angle_hor_spec>0)
             {
            newinput=document.createElement('input');
            newinput.name='angle_hor_spec';
            newinput.setAttribute('value',angle_hor_spec);
            form.appendChild(newinput);
              }
              if (angle_ver>0)
              {
            newinput=document.createElement('input');
            newinput.name='angle_ver';
            newinput.setAttribute('value',angle_ver);
            form.appendChild(newinput);
               }

            if(angle_ver_spec>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_ver_spec';
            newinput.setAttribute('value',angle_ver_spec);
            form.appendChild(newinput);
             }

            if(angle_triple_ver>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_triple_ver';
            newinput.setAttribute('value',angle_triple_ver);
            form.appendChild(newinput);
             }

            if(angle_triple_ver_spec>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_triple_ver_spec';
            newinput.setAttribute('value',angle_triple_ver_spec);
            form.appendChild(newinput);
             }

            if(angle_triple_hor>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_triple_hor';
            newinput.setAttribute('value',angle_triple_hor);
            form.appendChild(newinput);
             }

            if(angle_triple_hor_spec>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_triple_hor_spec';
            newinput.setAttribute('value',angle_triple_hor_spec);
            form.appendChild(newinput);
             }

               if(angle_quadro>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_quadro';
            newinput.setAttribute('value',angle_quadro);
            form.appendChild(newinput);
             }

            if(angle_quadro_spec>0)
            {
            newinput=document.createElement('input');
            newinput.name='angle_quadro_spec';
            newinput.setAttribute('value',angle_triple_ver_spec);
            form.appendChild(newinput);
             }
     newinput=document.getElementById('data');
     newinput.value=canvas.toDataURL({format:'png'});
     form.appendChild(newinput);

     form.submit();

    }
    // Сохранить пересчитанные отрезки шинопровода на участке и вывести в табличку
   function SavePieces()
   {


   	 var id=document.getElementById('point_id').value;

   	 points[id].line1.millies4=parseInt(document.getElementById('mil4_val').value,10);
   	 points[id].line1.millies3=parseInt(document.getElementById('mil3_val').value,10);
   	 points[id].line1.millies2=parseInt(document.getElementById('mil2_val').value,10);
   	 points[id].line1.millies=parseInt(document.getElementById('mil_val').value,10);

     document.getElementById('hint_span').style.color='#146b76';
     document.getElementById('hint_span').innerHTML='Ваш выбор сохранён!';

     console.log('Меняю блоки на отрезке - '+id);

     for (var k=0; k<points[id].line1.ipblocks.length; k++)
           {
              canvas.remove(points[id].line1.ipblocks[k]);
               }

     console.log('Блоков на отрезке - '+k);
     points[id].line1.ipblocks=[];
     canvas.renderAll();
     showBlocks(points, id);
     showTable(points);

          }
   function SaveOuts()
   {
   	  var id=document.getElementById('point_id').value,
   	  k;

      document.getElementById('hintouts_span').style.display='block';
      document.getElementById('hintouts_span').style.color='#146b76';
      document.getElementById('hintouts_span').innerHTML='Ваш выбор сохранён!';

   	  if (points[id].line1.millies4>0)
   	    {
   	    	var outs4=document.getElementsByName('mil4_outs');
   	    	for (var i=0; i<outs4.length; i++)
   	    	  {
   	    	  	k=parseInt(outs4[i].value,10);
   	    	  	if (k!=0)
   	    	  	   points[id].line1.outs_mil4[i]=1;
   	    	  	   else
                     points[id].line1.outs_mil4[i]=0;
   	    	  }
   	    }

      if (points[id].line1.millies3>0)
   	    {
   	    	var outs3=document.getElementsByName('mil3_outs');
   	    	for (var i=0; i<outs3.length; i++)
   	    	  {
   	    	  	k=parseInt(outs3[i].value,10);
   	    	  	if (k!=0)
   	    	  	   points[id].line1.outs_mil3[i]=1;
   	    	  	   else
                     points[id].line1.outs_mil3[i]=0;

   	    	  }
   	    }

      if (points[id].line1.millies2>0)
   	    {
   	    	var outs2=document.getElementsByName('mil2_outs');
   	    	for (var i=0; i<outs2.length; i++)
   	    	  {
   	    	  	k=parseInt(outs2[i].value,10);
   	    	  	if (k!=0)
   	    	  	   points[id].line1.outs_mil2[i]=1;
                    else
                     points[id].line1.outs_mil2[i]=0;
   	    	  }
   	    }


       for (var j=0; j<points[id].line1.ipblocks.length; j++)
           {
              canvas.remove(points[id].line1.ipblocks[j]);
               }
      canvas.renderAll();
      points[id].line1.ipblocks=[];
      showTable(points);
      showBlocks(points, id)
   }

   function CloseTable()
   {
     var id=document.getElementById('point_id').value;
     document.getElementById('fragment_check').style.display='none';

      points[id].line1.stroke='rgba(0,0, 0,0.4)';
      points[id].line1.line1.stroke='rgba(0,0, 0,0.4)';
      points[id].line1.line2.stroke='rgba(0,0, 0,0.4)';

      canvas.renderAll();

   }

   // Сохранить присоединение нестандартных участков к углу или к прямой секции
   function RestSave()
   {
     document.getElementById('info_span').style.display='block';
     console.log('Присоединяю остаток....');
   	 var id=document.getElementById('point_id').value,
   	     choice=parseInt(document.getElementById('rest_choice').value,10);
     if (choice==2)
         {
          console.log('.. к углу!');
          var rest=points[id].line1.rest;
          points[id].angle_side01=parseInt(points[id].line1.rest,10)+500;
          points[id].line1.rest=0;
          document.getElementById('info_span').style.color='#146b76';
          document.getElementById('info_span').innerHTML='Ваш выбор сохранён!';
          document.getElementById('rest_value').innerHTML=' ';
          document.getElementById('is_rest').innerHTML='На участке нет отрезков с нестандартными размерами';
          document.getElementById('addto_span').style.display='none';

         }

     if (choice==1)
       {
         console.log('.. к прямой секции!');
       	 if (points[id].line1.millies!=0)
       	    {
       	    	points[id].line1.millies--;
       	    	points[id].line1.rest=parseInt(points[id].line1.rest,10)+1000;
       	        document.getElementById('info_span').style.color='#146b76';
                document.getElementById('info_span').innerHTML='Ваш выбор сохранён!';
                document.getElementById('rest_value').innerHTML=points[id].line1.rest+' мм.';
                document.getElementById('addto_span').style.display='none';
       	    }
       	    else
       	       {
       	       	 if (points[id].line1.millies2!=0)
		       	    {
		       	    	points[id].line1.millies2--;
		       	    	points[id].line1.rest=parseInt(points[id].line1.rest,10)+2000;
       	                document.getElementById('info_span').style.color='#146b76';
                        document.getElementById('info_span').innerHTML='Ваш выбор сохранён!';
                        document.getElementById('rest_value').innerHTML=points[id].line1.rest+' мм.';
                        document.getElementById('addto_span').style.display='none';
		       	    }

       	          else
       	            {
       	              if (points[id].line1.millies3!=0)
		       	        {
			       	    	points[id].line1.millies3--;
			       	    	points[id].line1.rest=parseInt(points[id].line1.rest,10)+3000;
       	                    document.getElementById('info_span').style.color='#146b76';
	                        document.getElementById('info_span').innerHTML='Ваш выбор сохранён!';
	                        document.getElementById('rest_value').innerHTML=points[id].line1.rest+' мм.';
                            document.getElementById('addto_span').style.display='none';
		       	        }

		       	        else
		       	         {
                          document.getElementById('info_span').innerHTML='Нельзя добавить участок к прямому отрезку, потому что максимальная длина прямого участка не может быть длинее 4000мм. Попробуйте разбить фрагмент на участки другого размера и повторить попытку.';
 	                	         }

       	            }
       	       }
       }
   // Выводим изменённую инфу о секциях в левой колонке и говорим, что выбор сохранён
   // Сделать отдельную функцию вывода инфы!!

      SavePieces();
       }


   // Выбрать свободные углы

   function ChooseEnds()
    {
       document.getElementById('end_check').style.display='block';
       document.getElementById('end_div').innerHTML='<ul>';

       for (var i=0; i<points.length; i++)
        {
          if (points[i].endtype)
            {
               if (points[i].ende!=null)
                   {
                   	points[i].ende.erase();
                    canvas.add(points[i]);
                    }
               points[i].set('fill','yellow');
               if (!points[i].text)
        	   {
        	    text=new fabric.Text('№ '+i, {left: points[i].left+10, top: points[i].top, fontSize: 14, fontFamily: 'Century Gothic'});
                points[i].text=text;
        	    points[i].text.selectable=false;
        	     }
            	canvas.add(points[i].text);

               document.getElementById('end_div').innerHTML+='<li style="list-style: none;">'+i+'. <img src="cursor.png"> <input type="hidden" id="id'+i+'" value="Заглушка"><select onchange="document.getElementById(\'id'+i+'\').value=this.options[this.selectedIndex].value"><option>Заглушка</option><option>Фланцевый вывод</option><option>Трансформатор</option><option>Кабельный ввод</option></select></li>';
               }
          }
          document.getElementById('end_div').innerHTML+='</ul>';
      }

    // Сохранить выбор
   function SaveEnds()
    {

      for (var i=0; i<points.length; i++)
        {
          if (points[i].endtype!=null)
            {
               canvas.remove(points[i]);
               canvas.remove(points[i].text);
               points[i].endtype=document.getElementById('id'+i).value;
               if (points[i].endtype=='Трансформатор')
                  { if (i==0) var linetype=points[i].line2.linetype;
                     else  var linetype=points[i].line1.linetype;
                  	var ende = new Transformator(points[i].top, points[i].left, linetype);
                  	ende.draw();
                  	points[i].ende=ende;
                  }
              if (points[i].endtype=='Фланцевый вывод')
                  {

                  	 var type, top, left;
                    if (i>0)
                       line=points[i].line1;
                    else
                       {
                       	line=points[i].line2;
                        line.side*=-1;
                       }

                      	if ((line.linetype==2)&&(line.side==-1)) type=1;
                      	if ((line.linetype==2)&&(line.side==1)) type=2;
                      	if ((line.linetype==1)&&(line.side==1)) type=3;
                      	if ((line.linetype==1)&&(line.side==-1)) type=4;
                      	if ((line.linetype==3)&&(line.side==-1)) type=5;
                      	if ((line.linetype==3)&&(line.side==1)) type=6;



                  	var ende = new Flanz(points[i].top, points[i].left, type);
                  	ende.draw();
                  	points[i].ende=ende;
                  }
              if (points[i].endtype=='Кабельный ввод')
                  {
                    var type, top, left;
                    if (i>0)
                       line=points[i].line1;
                    else
                       {line=points[i].line2;
                        line.side*=-1;
                       }
                      {
                      	if ((line.linetype==2)&&(line.side==-1)) type=1;
                      	if ((line.linetype==2)&&(line.side==1)) type=2;
                      	if ((line.linetype==1)&&(line.side==1)) type=3;
                      	if ((line.linetype==1)&&(line.side==-1)) type=4;
                      	if ((line.linetype==3)&&(line.side==-1)) type=5;
                      	if ((line.linetype==3)&&(line.side==1)) type=6;

                      }
                    switch (type){
                    	case 1:
                    	 left=points[i].left+w;
                    	 top=points[i].top;
                    	break;
                    	case 2:
                    	 left=points[i].left;
                    	 top=points[i].top-2*w;
                    	break;


                    	case 3:
                    		 left=points[i].left;
                    	 top=points[i].top-3*w;
                    	break;

                    	case 4:
                    	 left=points[i].left-w;
                    	 top=points[i].top-4*w;
                    	break;

                    	case 6:
                    	 left=points[i].left+2*w;
                    	 top=points[i].top-4*w;
                    	break;

                    	case 5:
                    	  left=points[i].left+w;
                    	  top=points[i].top-3*w;
                    	  break;


                    }
                  	var ende = new Cable(top, left,type);
                  	ende.draw();
                  	points[i].ende=ende;
                  }
              if (points[i].endtype=='Заглушка')
                  {

                  }

              }
    	}

      document.getElementById('end_check').style.display='none';
      showTable(points);
    }

    }


