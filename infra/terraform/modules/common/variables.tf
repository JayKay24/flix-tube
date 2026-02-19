variable "flixtube_az_resource_group_name" {
  type = string
  description = "Azure Resource Group Name to manage flixtube resources"
}

variable "flixtube_az_region_name" {
  type = string
  description = "Azure Region where application is deployed"
}

variable "flixtube_az_container_registry_name" {
  type = string
  description = "Azure Container Registry Name to host flixtube container images"
}
