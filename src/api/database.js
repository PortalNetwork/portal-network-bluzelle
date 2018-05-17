import bluzelle from 'bluzelle';

// The following two config parameters should be replaced 
// to the workable bluzelle port and uuid.
const bluzellePort = process.env.SWARM_PORT;
const UUID = process.env.UUID;

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
    console.log('update result : \n', result)
    return result;
  } catch (error) {
    console.log('update error : \n', error);
    return error;
  }
}

export const remove = async (key) => {
  try {
    if (key.length === 0) return {message: 'invalid key'}
    const result = await bluzelle.remove(key);
    console.log('remove result : \n', result)
    return result;
  } catch (error) {
    console.log('remove error : \n', error);
    return error;
  }
}