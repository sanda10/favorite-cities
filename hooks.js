let state = [];
let index = 0;
function useState(initialValue) {
  const localIndex = index;
  state[localIndex] = state[localIndex] ?? initialValue;
  const setState = (updatedState) => {
    state[localIndex] = updatedState;
    render();
  };
  index++;
  return [state[localIndex], setState];
}

function useEffect(callback, deps) {
  const prevDeps = state[index];
  const hasChanged =
    !prevDeps || prevDeps.some((_, i) => prevDeps[i] !== deps[i]);

  if (hasChanged) {
    callback();
    state[index] = deps;
  }
  index++;
}

function useMyHook() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    if (count === -1 && name !== "Negative counter") {
      setName("Negative counter");
    }
  }, [count, name]);

  return [count, name, setCount, setName];
}

function Counter() {
  [count, name, setCount, setName] = useMyHook();

  return {
    display: () => console.log("Count:", count, ", name: ", name),
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
    rename: (name) => setName(name),
  };
}

let component;
function render() {
  index = 0;
  component = Counter();
  component.display();
}

render();

component.increment();

component.decrement();

component.rename("Primary counter");

component.decrement();

component.decrement();
