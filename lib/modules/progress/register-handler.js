const HANDLED_TOPIC = 'progress-register';

module.exports = function registerHandler(topic, action) {
  if (topic.includes(HANDLED_TOPIC)) {
    exec(action);
    return true;
  }
  return false;
};

// write behaviors
function exec(action) {}
