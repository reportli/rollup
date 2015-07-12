<article class="content-container">
  <p class="todo-content">{content}</p>
  {?completed}
    <p class="completed-date">completed on<br> <span>{completed|date}</span></p>
  {/completed}
</article>
<div class="item-controls">
  {^isDone}
    <button class="btn-finish">&#10003;</button>
  {/isDone}
</div>