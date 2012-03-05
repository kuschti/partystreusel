# Partystreusel

## Installation
Add **partystreusel** to your Gemfile `gem 'partystreusel'` and bundle. Done.

## Available components:
  * **Expandable Content:** enables a "read more" button to show or hide additional content.
  * **Accordion:** Allows for multiple nested accordions.

## Expandable Content

#### Usage in Rails:
Inside your manifest, usually application.js(.coffe):

    #= require sc.expandable_content

#### Required Markup:  

    #jump_id.expandable
      … your content …
      %a.more{ :href => '' } read more
      .expandable-content.hidden
        … read more content …
        %a.less{ :href => '#jump_id' } read less

#### Use it:

    $(".expandable").each ->
      new SC.ExpandableContent(el: $(this))

## Accordion

Inside your manifest, usually application.js(.coffe):

    #= require sc.accordion

#### Required Markup:  

    .accordion
      .accordion-item
        .title 
          The clickable header of the accordion item
        .content
          … The content which is toggled by clicking the header …

#### Use it:
    
    $(".accordion").each ->
      new SC.Accordion(el: $(this))          