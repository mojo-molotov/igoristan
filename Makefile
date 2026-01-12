MAKEFLAGS += --silent

#==============
# § I. CONFIG
#==============
PM := pnpm
NODE_MODULES := node_modules

#=================
# § II. COMMANDS
#=================

#-------------------------
# **** II. 1) PM
#-------------------------

# @Mirror
%:
	$(PM) run "$@"

# @Default
all: install build

# @Mirror
install:
	$(PM) install

# @Mirror
build:
	$(PM) run build

#------------------
# **** II. 2) CMD
#------------------

wipe-wireit:
	$(PM) rimraf .wireit

clean-node-modules:
	$(PM) rimraf $(NODE_MODULES)

clean-dist:
	$(PM) clean:dist

clean: clean-dist wipe-wireit

fclean: clean clean-node-modules

re: fclean all

# * ...
.PHONY: all install build wipe-wireit clean-node-modules clean-dist clean fclean re
