const HANDLED_TOPIC = 'progress-presentation';

module.exports = function presentationHandler(topic, action) {
  if (topic.includes(HANDLED_TOPIC)) {
    exec(action);
    return true;
  }
  return false;
};

// read behaviors
function exec(action) {}
