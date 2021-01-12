const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var cors = require('cors');
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'students',
  password: '2020Vuo#',
  port: 5432,
})


const viewsDir = path.join(__dirname, 'views')
app.use(express.static(viewsDir))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, '../images')))
app.use(express.static(path.join(__dirname, '../media')))
app.use(express.static(path.join(__dirname, '../../weights')))
app.use(express.static(path.join(__dirname, '../../dist')))

// app.get('/', (req, res) => res.redirect('/face_detection'))
// app.get('/face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceDetection.html')))
// app.get('/face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceLandmarkDetection.html')))
// app.get('/face_expression_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'faceExpressionRecognition.html')))
// app.get('/age_and_gender_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'ageAndGenderRecognition.html')))
// app.get('/face_extraction', (req, res) => res.sendFile(path.join(viewsDir, 'faceExtraction.html')))
// app.get('/face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'faceRecognition.html')))
// app.get('/video_face_tracking', (req, res) => res.sendFile(path.join(viewsDir, 'videoFaceTracking.html')))
app.get('/webcam_face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceDetection.html')))
// app.get('/webcam_face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceLandmarkDetection.html')))
// app.get('/webcam_face_expression_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceExpressionRecognition.html')))
// app.get('/webcam_age_and_gender_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'webcamAgeAndGenderRecognition.html')))
// app.get('/bbt_face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceLandmarkDetection.html')))
// app.get('/bbt_face_similarity', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceSimilarity.html')))
// app.get('/bbt_face_matching', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceMatching.html')))
// app.get('/bbt_face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceRecognition.html')))
// app.get('/batch_face_landmarks', (req, res) => res.sendFile(path.join(viewsDir, 'batchFaceLandmarks.html')))
// app.get('/batch_face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'batchFaceRecognition.html')))



var bodyParser = require('body-parser')




var http = require('http');
var util = require('util')
// http.createServer(function (req, res) {

//   console.log('Request received: ');
//   // util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
//   util.log(req);
//   util.log(req.body);
//   // util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   req.on('data', function (chunk) {
//     console.log('GOT DATA!');
//   });
//   res.end('callback(\'{\"msg\": \"OK\"}\')');

// }).listen(880);
// console.log('Server running on port 8080');
// console.log('Server running at http://192.168.0.143:8080/');

app.post("/getInfo", (req, res) => {
  // console.log(req.body.data);
  console.log(req.body);
  // console.log(req.body.result[0].time);
  var gio_vao_lop = req.body.data[0].time;
  var day_in_class = req.body.data[0].day
  console.log('ngay' + day_in_class);
  var gio_bat_dau = ''
  var gio_ket_thuc = ''
  var gio_limit = ''
  // let limit = `select ${req.body.data2[0].time} + (20 || ' minutes'):: interval`
  // var sql1 = 
  var sql = `select ds.id_subject ,ds.begin1, ds.end1 from subjects s inner join details_subject ds on s.id = ds.id_subject where date_part('dow',current_date) = day_of_week and ((ds.begin1 < '${gio_vao_lop}')and '${gio_vao_lop}'<=ds.end1)  `
  console.log(`select ds.id_subject, ds.begin1, ds.end1 from subjects s inner join details_subject ds on s.id = ds.id_subject where date_part('dow', current_date) = day_of_week and((ds.begin1 < '${gio_vao_lop}')and '${gio_vao_lop}' <= ds.end1)  `)
  // var issueID;
  pool.query(sql, function (err, result) {
    if (err) {
      console.log("error in tracking");
    }
    // console.log('r nè:' + result.rows[0]['begin1'])
    // console.log('r nè:' + result.rows[0].time)
    gio_bat_dau = result.rows[0]['begin1']
    gio_ket_thuc = result.rows[0]['end1']
    var id_mon_hoc = result.rows[0]['id_subject']
    console.log(id_mon_hoc);
    // console.log(select * from current_date();)1
    console.log(gio_bat_dau)
    console.log('gio bat dau ne ' + gio_bat_dau)
    pool.query(`select '${gio_bat_dau}' + (20 || 'minutes'):: interval limit1`, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result.rows[0].limit1);
      h = JSON.stringify(result.rows[0].limit1.hours);
      m = JSON.stringify(result.rows[0].limit1.minutes);
      s = JSON.stringify(result.rows[0].limit1.seconds);
      console.log('s ne' + s)
      if (h < 10) {
        gio_limit = '0' + h + ':' + m + ':' + '00';
      }
      else {
        gio_limit = h + ':' + m + ':' + '00';
      }

      var type = 0;
      console.log(gio_vao_lop)
      console.log(gio_bat_dau)
      console.log(gio_limit)
      if (gio_vao_lop <= gio_bat_dau) {
        type = 0
      }
      else if (gio_bat_dau < gio_vao_lop && gio_vao_lop <= gio_limit) {
        type = 1
      }
      else if (gio_vao_lop >= gio_limit) {
        type = 2
      }
      console.log(type)
      pool.query(`select '${gio_bat_dau}' + (20 || 'minutes'):: interval limit1`, function (err, result) {
        var re = `insert into yourtable select $userid, $rightid, $count where not (select true from yourtable where userid = $userid limit 1);`
        var re = `insert into attent_class(id_student,id_subject,time_in_class,status) select `
        var r = req.body
        var lastIndex = [Object.keys(r.data).length - 1];
        r.data.map((values, index) => {
          var char = (index == lastIndex) ? ';' : ',';
          re += `${values['id']},'${id_mon_hoc}','${gio_vao_lop}',${type} where not EXISTS (select true from attent_class where id_student = ${values['id']} and  day = '${values['day']}' )`;
        })
        console.log(re);
        pool.query(re, (error, response) => {
          if (error) {
            // console.log(đc);
            console.log(error)
          }
          else {
            console.log('Taochi tiet tahnh cong')



          }
        });
        console.log(r);
        if (err) {
          console.log(err);
        }
      });
    })


  });
})



app.get('/getListAttendClass', async (req, res) => {
  var query = `SELECT
    att.id_student AS id,
	name_student as fullname,
    regexp_replace(name_student,'^.* ', '') as name,
    array_agg(status) 
  FROM attent_class att inner join students s on att.id_student = s.id_student
  GROUP BY 
    att.id_student,name_student
  ORDER BY 
    name`
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});
app.get('/getHeaderTable', async (req, res) => {
  var query = `SELECT  distinct day as day_go_to_school from attent_class group by day_go_to_school order by day_go_to_school asc`
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      console.log(response.rows);
      res.send(response.rows);
    }
  });
});
app.get('/getStatusLate', async (req, res) => {
  var query = `
  select 

       extract(month from day) as m,
 	   count(status)

 from attent_class att inner join students s on att.id_student = s.id_student
 where status =1
group by 1
  `
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});
app.get('/getStatusInTime', async (req, res) => {
  var query = 
    `
     select 
       extract(month from day) as m,
	   count(status)
from attent_class att inner join students s on att.id_student = s.id_student
where status =0
group by 1
  `;
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});
app.get('/getStatusDisappear', async (req, res) => {
  var query = `
   select 

       extract(month from day) as m,
 	   count(status)

 from attent_class att inner join students s on att.id_student = s.id_student
 where status =2
group by 1
  `
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});
app.get('/getListAttenrCurrentDate', async (req, res) => {
  var query = `select * from attent_class att inner join students s on att.id_student = s.id_student where day = current_date order by time_in_class asc`
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});
app.get('/getNumberinClass', async (req, res) => {
  var query = `select count(*) as soluonglop from students`
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});
app.get('/getNumberStudent', async (req, res) => {
  var query = ` select count(*) as soluong from attent_class att inner join students s on att.id_student = s.id_student where day = current_date group by time_in_class,status,name_student,day,att.id_subject,att.id_student,s.id_student order by time_in_class asc`
  pool.query(query, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send(response.rows);
    }
  });
});

app.post('/fetch_external_image', async (req, res) => {
  const { imageUrl } = req.body
  if (!imageUrl) {
    return res.status(400).send('imageUrl param required')
  }
  try {
    const externalResponse = await request(imageUrl)
    res.set('content-type', externalResponse.headers['content-type'])
    return res.status(202).send(Buffer.from(externalResponse.body))
  } catch (err) {
    return res.status(404).send(err.toString())
  }
})

app.listen(4000, () => console.log('Listening on port 4000!'))

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function (resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? { encoding: null } : {}
    )

    get(options, function (err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}