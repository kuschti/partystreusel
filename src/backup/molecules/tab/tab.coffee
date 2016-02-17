class Tab extends Partystreusel.Base
  @className = 'Tab'

  constructor: (el) ->
    super
    @$el.find('.tab__nav-item').on 'click', @openItem
    @$navItems = @$el.find('.tab__nav-item')
    @$panels = @$el.find('.tab__panel')

    if @findItemAndPanel(window.location.hash)
      @openPanel(window.location.hash)

    unless @currentPanelName()?
      @openPanel(0)

  openItem: (e) =>
    item = $(e.target).closest('.tab__nav-item')
    name = item.find('[href]').attr('href')
    @openPanel(name)

  currentPanelName: ->
    @$panels.filter('.tab__panel--active').attr('id')

  openPanel: (name_or_number) ->
    if typeof name_or_number == 'number'
      panelName = @$panels[name_or_number].id
    else
      panelName = name_or_number

    itemAndPanel = @findItemAndPanel(panelName)
    unless itemAndPanel
      console.log("Nav Item or panel with name #{panelName} not found")
      return

    itemAndPanelToClose = @findItemAndPanel(@currentPanelName())
    if itemAndPanelToClose
      closeName = @currentPanelName()
      itemAndPanelToClose[0].removeClass('tab__nav-item--active')
      itemAndPanelToClose[1].removeClass('tab__panel--active')
      @trigger('close', closeName, itemAndPanelToClose[0], itemAndPanelToClose[1])

    itemAndPanel[0].addClass('tab__nav-item--active')
    itemAndPanel[1].addClass('tab__panel--active')

    @trigger('open', @currentPanelName(), itemAndPanel[0], itemAndPanel[1])

  findItemAndPanel: (name) ->
    return unless name?
    return unless name.length > 0

    if name.indexOf('#') == 0
      name = name.slice(1)

    panel = @$panels.filter("[id=#{name}]")
    if panel.length == 0
      return

    navItem = @$navItems.filter (index, item) ->
      $(item).find("[href='\##{name}']").length > 0
    if navItem.length == 0
      return

    [navItem, panel]

Partystreusel.Tab = Tab
