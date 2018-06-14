const bluzelle = require('bluzelle');

bluzelle.connect("ws://192.168.1.24:51010", "71e2cd35-b606-41e6-bb08-f20de30df76c");

// bluzelle.create('hello21', 'world').then(function(result) {
//   console.log(result);
// }).catch(function(err) {
//   console.log(err);
// })

bluzelle.keys().then(function(result) {
  console.log(result);
  bluzelle.read(result[0]).then(function(result) {
    console.log(result);
  }).catch(function(err) {
    console.log(err);
  })
}).catch(function(err) {
  console.log(err);
})

// bluzelle.update('hello21', 'xxx').then(function(result) {
//   console.log(result);
// })

bluzelle.remove('hello21').then(function(result) {
  console.log(result);
})

// describe('bluzelle', () => {
//   it('Read', async () => {
//     try {
//       bluzelle.connect(bluzellePort, UUID);
//       console.log('hi')
//       const result = await bluzelle.keys();
//       console.log('keys result : \n', result)
//       return result;
//     } catch (error) {
//       console.log('keys error: \n', error);
//       return error;
//     }
//   });
// })
