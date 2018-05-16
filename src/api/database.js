import bluzelle from 'bluzelle';

// The following two config parameters should be replaced 
// to the workable bluzelle port and uuid.
const bluzellePort = 'ws://13.78.131.94:51012';
const UUID = '90731a8f-60d4-44b2-ac79-5a56493eeb78';

bluzelle.connect(bluzellePort, UUID);

export const create = async (key, todoItems) => {
  try {
    if (key.length === 0) return {message: 'invalid key'}
    const result = await bluzelle.create(key, todoItems)
    console.log('create result : \n', result);
    return result;
  } catch (error) {
    console.log('create error : \n', error);
    return error;
  }
}

export const read = async (key) => {
  try {
    if (key.length === 0) return {message: 'invalid key'}
    const result = await bluzelle.read(key);
    console.log('read result : \n', result)
    return result;
  } catch (error) {
    console.log('read error : \n', error);
    return error;
  }
}

export const update = async (key, todoItems) => {
  try {
    if (key.length === 0) return {message: 'invalid key'}
    const result = await bluzelle.update(key, todoItems);
    console.log('read result : \n', result)
    return result;
  } catch (error) {
    console.log('read error : \n', error);
    return error;
  }
}

export const remove = async (key) => {
  try {
    if (key.length === 0) return {message: 'invalid key'}
    const result = await bluzelle.remove(key);
    console.log('read result : \n', result)
    return result;
  } catch (error) {
    console.log('read error : \n', error);
    return error;
  }
}