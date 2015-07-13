<article class="content-container">
  <p class="todo-content">{content}</p>
  {?completed}
    <p class="completed-date">completed on<br> <span>{completed|date}</span></p>
  {/completed}
</article>
<div class="item-controls">
  {^isDone}
    <button class="btn-finish mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
      <i class="material-icons">check</i>
    </button>
  {/isDone}
</div>