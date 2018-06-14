import bluzelle from 'bluzelle';

// The following two config parameters should be replaced 
// to the workable bluzelle port and uuid.
const bluzellePort = "ws://192.168.1.24:51010";
const UUID = "71e2cd35-b606-41e6-bb08-f20de30df76c";

// bluzelle.connect(bluzellePort, UUID);

export const create = (key, todoItems) => {
  if (key.length === 0) return {message: 'invalid input'}
  bluzelle.connect(bluzellePort, UUID);
  bluzelle.create(key, todoItems).then((result) => {
    console.log('result', result);
    return result;
  }, error => {
    return error;
  });
}

export const read = (key) => {
  if (key.length === 0) return {message: 'invalid key'}
  bluzelle.connect(bluzellePort, UUID);
  bluzelle.read(key).then(result => { 
    return result;
  }, error => {
    return error;
  });
};

export const update = (key, todoItems) => {
  if (key.length === 0) return {message: 'invalid key'}
  bluzelle.connect(bluzellePort, UUID);
  bluzelle.update(key, todoItems).then(() => { 
    return 'success';
  }, error => {
    return error;
  });
}

export const remove = (key) => {
  if (key.length === 0) return {message: 'invalid key'}
  bluzelle.connect(bluzellePort, UUID);
  bluzelle.remove(key).then(() => { 
    return 'success';
  }, error => {
    return error;
  });
}

export const readKeys = () => {
  bluzelle.keys().then(keys => {
    return keys;
  }, error => { 
    return error;
  });
};
